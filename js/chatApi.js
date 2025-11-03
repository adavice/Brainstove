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

export async function loadChatHistory(coachId = null) {
    const spinner = document.getElementById('chatLoadingSpinner');
    
    try {
        // Show spinner
        if (spinner) {
            spinner.style.display = 'block';
        }
        
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
        
    } catch (error) {
        console.error('Error loading chat history:', error);
        throw error;
    } finally {
        // Hide spinner after loading completes (success or failure)
        if (spinner) {
            spinner.style.display = 'none';
        }
    }
}

