// placeholder replacement logic
export function applyScripts(text, isActive) {
  if (!isActive || !text) return text;

  const timestamp = new Date().toISOString();
  const msgid = generateId("MSG");
  const txnid = generateId("TXN");

  return text
    .replace(/{{\s*ts\s*}}/g, timestamp)
    .replace(/{{\s*msgid\s*}}/g, msgid)
    .replace(/{{\s*txnid\s*}}/g, txnid);
}

function generateId(prefix) {
  return `${prefix}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}
