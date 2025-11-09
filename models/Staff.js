// models/Staff.js
class Staff {
  constructor(username, password, role = "staff") {
    this.username = username;
    this.password = password;
    this.role = role; // "admin", "doctor", "nurse", "staff"
    this.lastLogin = null;
  }

  // Validate login credentials (plain-text for demo)
  authenticate(inputUser, inputPass) {
    return this.username === inputUser && this.password === inputPass;
  }

  // Record time of successful login
  markLogin() {
    this.lastLogin = new Date().toISOString();
  }

  // Check if staff has admin privileges
  isAdmin() {
    return this.role === "admin";
  }

  // Change staff role (e.g., promote/demote)
  updateRole(newRole) {
    const validRoles = ["admin", "doctor", "nurse", "staff"];
    if (validRoles.includes(newRole)) {
      this.role = newRole;
    } else {
      throw new Error("Invalid role type");
    }
  }

  // Serialize for JSON storage
  toJSON() {
    return {
      username: this.username,
      password: this.password,
      role: this.role,
      lastLogin: this.lastLogin
    };
  }
}

module.exports = Staff;
