// Step 2 of "Login with GitHub": swaps GitHub's code for a token and hands it
// back to the /admin window using the message format Decap CMS expects.

const readCookie = (req, name) =>
  (req.headers.cookie || '')
    .split(';')
    .map((c) => c.trim().split('='))
    .find(([key]) => key === name)?.[1];

const respond = (res, status, content) => {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  // Escape "<" so the token text can never close the script tag.
  const payload = JSON.stringify(message).replace(/</g, '\\u003c');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Set-Cookie', 'cms_oauth_state=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
  res.status(200).send(`<!doctype html><html><body><script>
  (function () {
    function receive(e) {
      if (e.origin !== window.location.origin) return;
      window.opener.postMessage(${payload}, e.origin);
      window.removeEventListener('message', receive);
    }
    window.addEventListener('message', receive, false);
    window.opener.postMessage('authorizing:github', window.location.origin);
  })();
  </script><p>Logging you in… you can close this window if it stays open.</p></body></html>`);
};

export default async function handler(req, res) {
  const { code, state, error, error_description: errorDescription } = req.query;

  if (error) return respond(res, 'error', { message: errorDescription || error });
  if (!code || !state || state !== readCookie(req, 'cms_oauth_state')) {
    return respond(res, 'error', { message: 'Login expired or was interrupted. Please try again.' });
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const data = await response.json();

    if (!data.access_token) {
      return respond(res, 'error', { message: data.error_description || 'GitHub did not return a token.' });
    }
    return respond(res, 'success', { token: data.access_token, provider: 'github' });
  } catch {
    return respond(res, 'error', { message: 'Could not reach GitHub. Please try again.' });
  }
}
