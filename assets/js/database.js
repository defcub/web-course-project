// ПІДКЛЮЧЕННЯ ДО SUPABASE

const databaseUrl = 'https://tmgvsunlcgbujkujpnzc.supabase.co';
const databaseKey = 'sb_publishable_07x7239yVI9ARO1XYKYZjA_kVANRncp';

async function getDatabaseProjects() {
    const url = new URL('/rest/v1/projects', databaseUrl);

    url.searchParams.set(
        'select',
        'id,slug,image_path,content_en,content_uk,sort_order,categories(slug,name_en,name_uk)'
    );

    url.searchParams.set('order', 'sort_order.asc,id.asc');

    const response = await fetch(url, {
        headers: {
            apikey: databaseKey,
            Accept: 'application/json'
        },
        signal: AbortSignal.timeout(15000)
    });

    if (!response.ok) {
        throw new Error(
            `Не вдалося отримати проєкти. Код відповіді: ${response.status}`
        );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
        throw new Error('База повернула дані в неочікуваному форматі.');
    }

    return data;
}