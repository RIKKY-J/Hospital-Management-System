// public/classes/UserSession.js
class UserSession {
  constructor() {
    this.username = sessionStorage.getItem('username') || null;
    this.role = sessionStorage.getItem('role') || null;
    this.token = sessionStorage.getItem('token') || null;
  }

  // Save session details
  login(username, role, token) {
    this.username = username;
    this.role = role;
    this.token = token;
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('token', token);
  }

  // Clear session data
  logout() {
    this.username = null;
    this.role = null;
    this.token = null;
    sessionStorage.clear();
  }

  // Check if logged in
  isLoggedIn() {
    return !!this.token;
  }

  // Check if user is admin
  isAdmin() {
    return this.role === 'admin';
  }

  // Get stored username
  getUser() {
    return this.username || 'Guest';
  }

  // Show quick session info (for debugging or UI)
  getSessionInfo() {
    return {
      username: this.username,
      role: this.role,
      token: this.token
    };
  }
}

// Export globally (for browser)
window.UserSession = UserSession;
