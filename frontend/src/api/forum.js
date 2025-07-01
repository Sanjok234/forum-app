const API_URL = 'http://localhost:5000/api/forums';

export async function fetchForums() {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User is not authenticated');
  }
  const res = await fetch(`${API_URL}/`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    
  });
  if (!res.ok) {
    throw new Error('Failed to fetch forums');
  }
  return res.json();
}

export async function createForum({ title, content }) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User is not authenticated');
  }

  const res = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create forum');
  }
  return res.json();
}

export async function fetchForumComments(id) {
  const res = await fetch(`${API_URL}/${id}/comments`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch comments');
  }
  return res.json();
}

export async function postForumComment(forumId, content) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User is not authenticated');
  const res = await fetch(`${API_URL}/${forumId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to post comment');
  }
  return res.json();
}

export async function postForumReply(forumId, commentId, content) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User is not authenticated');
  const res = await fetch(`${API_URL}/${forumId}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to post reply');
  }
  return res.json();
}

// Upvote a forum post
export async function upvoteForum(forumId) {
  console.log("api"+ forumId);
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User is not authenticated');
  const res = await fetch(`${API_URL}/upvote/${forumId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to upvote forum');
  }
  return res.json();
}

// Remove upvote from a forum post
export async function removeUpvoteForum(forumId) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User is not authenticated');
  const res = await fetch(`${API_URL}/upvote/${forumId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to remove upvote from forum');
  }
  return res.json();
}

// Upvote a comment
export async function upvoteComment(forumId, commentId) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User is not authenticated');
  const res = await fetch(`${API_URL}/${forumId}/comments/${commentId}/upvote`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to upvote comment');
  }
  return res.json();
}

// Remove upvote from a comment
export async function removeUpvoteComment(forumId, commentId) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User is not authenticated');
  const res = await fetch(`${API_URL}/${forumId}/comments/${commentId}/upvote`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to remove upvote from comment');
  }
  return res.json();
}

export async function updateForum(id, { title, content }) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User is not authenticated');
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update forum');
  }
  return res.json();
}

export async function fetchForumById(id) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User is not authenticated');
  const res = await fetch(`${API_URL}/${id}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch forum');
  }
  return res.json();
} 