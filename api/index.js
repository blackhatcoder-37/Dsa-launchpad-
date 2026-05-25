let workerHandler = null;

async function getHandler() {
  if (workerHandler) return workerHandler;
  
  try {
    const module = await import('../dist/server/index.js');
    workerHandler = module.default;
    return workerHandler;
  } catch (err) {
    console.error('Failed to load server worker:', err);
    throw err;
  }
}

export default async (req, res) => {
  try {
    const handler = await getHandler();

    // Build the full URL
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url || '/', `${protocol}://${host}`);

    // Create a Fetch API request
    const request = new Request(url, {
      method: req.method,
      headers: new Headers(req.headers),
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req.body ? JSON.stringify(req.body) : undefined,
    });

    // Call the Cloudflare Worker handler
    const response = await handler.fetch(request);

    // Set response headers
    response.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });

    // Set status and send response body
    res.status(response.status);
    const body = await response.text();
    res.send(body);
  } catch (error) {
    console.error('Vercel handler error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
