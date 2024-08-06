const mysql = require('mysql2/promise');

class User {
  constructor(pool) {
    this.pool = pool;
  }

  async register(user) {
    const { name, email, password } = user; // Destructure user object

    // Hash password before storing (use a secure library like bcrypt)
    const hashedPassword = await hashPassword(password); // Replace with hashing logic

    const [result] = await this.pool.query('INSERT INTO users SET ?', {
      name,
      email,
      password: hashedPassword
    });

    return result.insertId; // Return the newly created user ID
  }

  async login(email, password) {
    const [rows] = await this.pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return null; // User not found
    }

    const user = rows[0];
    const isValidPassword = await comparePassword(password, user.password); 

    if (!isValidPassword) {
      return null; // Invalid password
    }

    return user; // User object on successful login
  }

  async logout(userId) {
    // Implement logic for session management or token invalidation (if applicable)
    // For example, if using JWT tokens, invalidate the token associated with the user ID
    console.log(`User ${userId} logged out (placeholder for session/token invalidation)`);
  }
}

module.exports = User;
