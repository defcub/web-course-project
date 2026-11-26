const databaseUrl = 'https://tmgvsunlcgbujkujpnzc.supabase.co';
const databaseKey = 'sb_publishable_07x7239yVI9ARO1XYKYZjA_kVANRncp';

// отримання списку проєктів через сервер на render
async function getDatabaseProjects() {
    const response = await fetch('https://enver-api.onrender.com/api/projects', {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(60000)
    });

    if (!response.ok) {
        throw new Error(`Не вдалося отримати проєкти. Код: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
        throw new Error('Сервер повернув дані в неочікуваному форматі.');
    }

    return data;
}