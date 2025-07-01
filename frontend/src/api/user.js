const API_URL = 'http://localhost:5000/api/users';

export async function fetchUserProfile(userId) {
  const res = await fetch(`${API_URL}/${userId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch user profile');
  }
  // Handle empty response
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Invalid user profile data');
  }
}

export async function fetchUserForums(userId) {
  const res = await fetch(`${API_URL}/${userId}/forums`);
  if (!res.ok) {
    throw new Error('Failed to fetch user forums');
  }
  const text = await res.text();
  if (!text) return [];
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Invalid user forums data');
  }
} 