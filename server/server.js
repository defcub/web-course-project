import { createServer } from 'node:http';

const port = Number(process.env.PORT || 3000);
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;
const allowedOrigins = new Set(
    (process.env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean)
);

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables.');
}

function sendJson(response, status, data) {
    response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify(data));
}

const server = createServer(async (request, response) => {
    const origin = request.headers.origin;
    response.setHeader('Vary', 'Origin');
    response.setHeader('Cache-Control', 'no-store');

    if (origin && !allowedOrigins.has(origin)) {
        sendJson(response, 403, { error: 'Origin is not allowed.' });
        return;
    }

    if (origin) {
        response.setHeader('Access-Control-Allow-Origin', origin);
    }

    if (request.method === 'OPTIONS') {
        response.writeHead(204, {
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        response.end();
        return;
    }

    const pathname = new URL(request.url, 'http://localhost').pathname;

    if (pathname !== '/api/health' && pathname !== '/api/projects') {
        sendJson(response, 404, { error: 'Route not found.' });
        return;
    }

    if (request.method !== 'GET') {
        response.setHeader('Allow', 'GET, OPTIONS');
        sendJson(response, 405, { error: 'Method not allowed.' });
        return;
    }

    if (pathname === '/api/health') {
        sendJson(response, 200, { status: 'ok', service: 'enver-api' });
        return;
    }

    try {
        const url = new URL('/rest/v1/projects', supabaseUrl);
        url.searchParams.set('select', 'id,slug,image_path,content_en,content_uk,sort_order,categories(slug,name_en,name_uk)');
        url.searchParams.set('order', 'sort_order.asc,id.asc');

        const result = await fetch(url, {
            headers: { apikey: supabaseKey, Accept: 'application/json' },
            signal: AbortSignal.timeout(15000)
        });

        if (!result.ok) {
            console.error('Supabase request failed:', result.status);
            sendJson(response, 502, { error: 'Could not load projects.' });
            return;
        }

        const projects = await result.json();

        if (!Array.isArray(projects)) {
            throw new Error('Unexpected database response.');
        }

        sendJson(response, 200, projects);
    } catch (error) {
        console.error('Projects request failed:', error.message);
        sendJson(response, 502, { error: 'Database temporarily unavailable.' });
    }
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Enver API is listening on port ${port}`);
});