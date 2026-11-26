// Returns the approximate location Vercel derives from the visitor's IP.
// Nothing is logged or stored; this just shows what any server can see.
export function GET(request) {
  const h = request.headers;
  const read = (name) => {
    const v = h.get(name);
    if (!v) return '';
    try { return decodeURIComponent(v); } catch { return v; }
  };
  return Response.json(
    {
      city: read('x-vercel-ip-city'),
      region: read('x-vercel-ip-country-region'),
      country: read('x-vercel-ip-country'),
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
