import { API_BASE_URL } from './config.js';

export async function loadCoaches() {
    const response = await fetch(`${API_BASE_URL}?action=list_coaches`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    });
    return response.json();
}

export function getCurrentUser() {
    // todo: get current user method here
    
}

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

