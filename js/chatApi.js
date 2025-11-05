import { API_BASE_URL } from './config.js';

// Promise-based cache to coalesce concurrent calls and avoid duplicate fetches
let coachesCachePromise = null;

export async function loadCoaches() {
    // Return cached promise if available
    if (coachesCachePromise) {
        console.log('Using cached coaches data');
        return coachesCachePromise;
    }

    // Create and cache the in-flight request
    coachesCachePromise = (async () => {
        const response = await fetch(`${API_BASE_URL}?action=list_coaches`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Failed to load coaches: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched and cached coaches data');
        return data;
    })();

    // If the request fails, clear the cache so a future retry can occur
    coachesCachePromise = coachesCachePromise.catch(err => {
        console.error('Error loading coaches:', err);
        coachesCachePromise = null;
        throw err;
    });

    return coachesCachePromise;
}

export function getCurrentUser() {
    // todo: get current user method here
    
}

export async function loadChatHistory(coachId = null) {
    const user = getCurrentUser();
    if (!user?.id) throw new Error('No user logged in');
    let url = `${API_BASE_URL}?action=chat_history&user_id=${encodeURIComponent(user.id)}`;
    if (coachId) {
        url += `&coach_id=${encodeURIComponent(coachId)}`;
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    });
    const data = await response.json();
    console.log('loadChatHistory response:', data);
    return data;
}

