import { API_BASE_URL } from './config.js';

let coachesCache = null;

export async function loadCoaches() {
    // Return cached data if available
    if (coachesCache) {
        console.log('Using cached coaches data');
        return coachesCache;
    }

    try {
        const response = await fetch(`${API_BASE_URL}?action=list_coaches`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to load coaches: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Cache the result
        coachesCache = data;
        console.log('Fetched and cached coaches data');
        return coachesCache;
    } catch (error) {
        console.error('Error loading coaches:', error);
        throw error; // Re-throw to let callers handle it
    }
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

