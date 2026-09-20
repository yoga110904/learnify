/* Learnify — Pyodide worker.
   Menjalankan kode user + test case di thread terpisah supaya UI tidak nge-freeze. */
const PYODIDE_VERSION = '0.26.4';
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodide = null;
let ready = false;

const DRIVER = String.raw`
import ast, io, json, sys, builtins, contextlib, traceback, inspect, linecache

_REAL_INPUT = builtins.input

def _fmt_exc(e):
    if isinstance(e, AssertionError):
        msg = str(e).strip()
        return "Assertion gagal" + (": " + msg if msg else " — hasilnya belum sesuai yang diminta.")
    tb = traceback.format_exception_only(type(e), e)
    return "".join(tb).strip()

async def _exec(src, ns, buf, filename="<learnify>"):
    # daftarkan ke linecache supaya inspect.getsource() tetap bekerja
    linecache.cache[filename] = (len(src), None, src.splitlines(True), filename)
    obj = compile(src, filename, "exec", flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)
    with contextlib.redirect_stdout(buf), contextlib.redirect_stderr(buf):
        res = eval(obj, ns)
        if inspect.isawaitable(res):
            await res

async def learnify_run(payload_json):
    payload = json.loads(payload_json)
    user_code = payload.get("code") or ""
    tests = payload.get("tests") or []
    setup = payload.get("setup") or ""
    stdin_lines = list(payload.get("stdin") or [])

    ns = {"__name__": "__main__"}
    buf = io.StringIO()

    def fake_input(prompt=""):
        if prompt:
            print(prompt, end="")
        if not stdin_lines:
            raise EOFError("Tidak ada input lagi yang tersedia.")
        val = str(stdin_lines.pop(0))
        print(val)
        return val

    builtins.input = fake_input
    out = {"stdout": "", "error": None, "tests": []}
    try:
        if setup:
            try:
                await _exec(setup, ns, buf, "<setup>")
            except Exception as e:
                out["error"] = "Setup error: " + _fmt_exc(e)
                out["stdout"] = buf.getvalue()
                return json.dumps(out)
        try:
            await _exec(user_code, ns, buf, "<kode_kamu>")
        except Exception as e:
            out["error"] = _fmt_exc(e)
        out["stdout"] = buf.getvalue()

        # variabel bantu untuk test yang memeriksa hasil print()
        ns["STDOUT"] = out["stdout"]
        ns["OUTPUT"] = out["stdout"].strip()
        ns["LINES"] = [l for l in out["stdout"].splitlines()]

        for t in tests:
            item = {"name": t.get("name") or t.get("code", ""), "code": t.get("code", ""), "pass": False, "error": None}
            if out["error"]:
                item["error"] = "Kode kamu error, test tidak dijalankan."
                out["tests"].append(item)
                continue
            tbuf = io.StringIO()
            try:
                await _exec(t.get("code", ""), ns, tbuf, "<test>")
                item["pass"] = True
            except Exception as e:
                item["error"] = _fmt_exc(e)
            out["tests"].append(item)
    finally:
        builtins.input = _REAL_INPUT
    return json.dumps(out)
`;

async function boot() {
  if (ready) return;
  self.importScripts(PYODIDE_URL + 'pyodide.js');
  pyodide = await self.loadPyodide({ indexURL: PYODIDE_URL });
  await pyodide.runPythonAsync(DRIVER);
  ready = true;
}

self.onmessage = async (ev) => {
  const msg = ev.data || {};
  if (msg.type === 'init') {
    try {
      self.postMessage({ type: 'status', text: 'Mengunduh Python (Pyodide)…' });
      await boot();
      self.postMessage({ type: 'ready' });
    } catch (e) {
      self.postMessage({ type: 'boot-error', error: String(e) });
    }
    return;
  }
  if (msg.type === 'run') {
    try {
      await boot();
      const payload = JSON.stringify({
        code: msg.code || '',
        tests: msg.tests || [],
        setup: msg.setup || '',
        stdin: msg.stdin || []
      });
      pyodide.globals.set('__learnify_payload', payload);
      const raw = await pyodide.runPythonAsync('await learnify_run(__learnify_payload)');
      self.postMessage({ type: 'result', id: msg.id, result: JSON.parse(raw) });
    } catch (e) {
      self.postMessage({
        type: 'result', id: msg.id,
        result: { stdout: '', error: String(e && e.message ? e.message : e), tests: [] }
      });
    }
  }
};
