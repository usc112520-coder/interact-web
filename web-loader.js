window.__interactModules = Object.create(null);
window.__interactAssetBase = new URL('./assets/', document.baseURI).href;
const pending = Object.create(null);
window.__interactImport = function (relative) {
  const name = relative.replace(/^\.\//, '');
  if (!/^[\w.-]+\.js$/.test(name)) return Promise.reject(new Error('Invalid module path'));
  if (window.__interactModules[name]) return Promise.resolve(window.__interactModules[name]);
  if (pending[name]) return pending[name];
  return pending[name] = (async () => {
    if (name.startsWith('exportSessionReport-')) await window.__interactImport('./exceljs.min-DY_WS6Pk.js');
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL(name, window.__interactAssetBase).href;
      script.onload = resolve;
      script.onerror = () => reject(new Error('無法載入 ' + name));
      document.head.appendChild(script);
    });
    return window.__interactModules[name];
  })();
};
if (!location.hash) location.hash = '/presenter/new';
