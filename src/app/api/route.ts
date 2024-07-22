export async function POST(req: Request) {
  const {
    code
  } = await req.json();

  if (!code) {
    return Response.json("", {status: 400});
  }

  const token = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code
    })
  });

  const str = await token.text();

  const tk = str.substring(str.indexOf("n=") + 2, str.indexOf("&scope"));

  return Response.json(tk);
}