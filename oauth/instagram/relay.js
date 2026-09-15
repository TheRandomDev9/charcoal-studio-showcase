(() => {
  'use strict';
  const input = new URLSearchParams(location.search);
  const output = new URLSearchParams();
  for (const key of ['state', 'code', 'error', 'error_description']) {
    const value = input.get(key);
    if (value !== null && value.length <= 8192) output.set(key, value);
  }
  const valid = output.has('state') && (output.has('code') || output.has('error'));
  const status = document.querySelector('#status');
  const link = document.querySelector('#return');
  if (!valid) {
    status.textContent = 'Instagram did not return a valid authorization result. Close this page and start Connect again.';
    return;
  }
  const target = 'http://127.0.0.1:51840/oauth/callback/instagram?' + output.toString();
  link.href = target;
  link.hidden = false;
  link.textContent = 'Return to Studio';
  status.textContent = 'Authorization received. Returning through your private Studio tunnel…';
  location.replace(target);
})();
