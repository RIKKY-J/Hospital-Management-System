// public/app.js
async function getJSON(url) {
  const r = await fetch(url, { credentials: 'same-origin' });
  if (!r.ok) {
    let msg = 'HTTP ' + r.status;
    try { msg = (await r.json()).error || msg; } catch (e) {}
    throw new Error(msg);
  }
  return r.json();
}

async function postJSON(url, data) {
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });
  if (!r.ok) {
    let err = 'HTTP ' + r.status;
    try { err = (await r.json()).error || err; } catch (e) {}
    throw new Error(err);
  }
  return r.json();
}
