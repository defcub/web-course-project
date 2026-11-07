import { createClient } from 'npm:@supabase/supabase-js@2';

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
};

function sendResponse(status: number, data: object) {
    return new Response(JSON.stringify(data), {
        status: status,
        headers: headers
    });
}

Deno.serve(async function (request) {
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: headers
        });
    }

    if (request.method !== 'POST') {
        return sendResponse(405, {
            error: 'method_not_allowed'
        });
    }

    let data;

    try {
        data = await request.json();
    } catch {
        return sendResponse(400, {
            error: 'invalid_json'
        });
    }

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return sendResponse(400, {
            error: 'invalid_data'
        });
    }

    const name = typeof data.name === 'string' ? data.name.trim() : '';
    const email = typeof data.email === 'string' ? data.email.trim() : '';
    const service = typeof data.service === 'string' ? data.service.trim() : '';
    const message = typeof data.message === 'string' ? data.message.trim() : '';

    if (name.length < 2 || name.length > 80) {
        return sendResponse(400, {
            error: 'invalid_name'
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length > 120 || !emailPattern.test(email)) {
        return sendResponse(400, {
            error: 'invalid_email'
        });
    }

    const services = ['design', 'development', 'branding'];

    if (!services.includes(service)) {
        return sendResponse(400, {
            error: 'invalid_service'
        });
    }

    if (message.length < 20 || message.length > 2000) {
        return sendResponse(400, {
            error: 'invalid_message'
        });
    }

    if (data.agreement !== true) {
        return sendResponse(400, {
            error: 'agreement_required'
        });
    }

    try {
        const databaseUrl = Deno.env.get('SUPABASE_URL');
        const databaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        if (!databaseUrl || !databaseKey) {
            return sendResponse(500, {
                error: 'server_configuration_error'
            });
        }

        const database = createClient(databaseUrl, databaseKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        });

        const { error } = await database
            .from('project_requests')
            .insert({
                name: name,
                email: email,
                service: service,
                message: message
            });

        if (error) {
            console.error('Request insert failed:', error.code);

            return sendResponse(500, {
                error: 'save_failed'
            });
        }

        return sendResponse(201, {
            success: true
        });
    } catch {
        return sendResponse(500, {
            error: 'server_error'
        });
    }
});