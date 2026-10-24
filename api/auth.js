// Step 1 of "Login with GitHub" for the /admin editor (Vercel serverless function).
// Needs GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Vercel → Settings → Environment Variables.
import crypto from 'node:crypto';

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    res.status(500).send('GITHUB_CLIENT_ID is not set in the Vercel environment variables.');
    return;
  }

  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const state = crypto.randomBytes(16).toString('hex');

  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', `${proto}://${host}/api/callback`);
  url.searchParams.set('scope', req.query.scope || 'repo');
  url.searchParams.set('state', state);

  res.setHeader('Set-Cookie', `cms_oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
  res.redirect(302, url.toString());
}
