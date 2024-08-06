const bcrypt = require('bcrypt');

class User {
    constructor(pool) {
        this.pool = pool;
    }

    async register(user) {
        const { name, email, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await this.pool.query('INSERT INTO users SET ?', {
            name,
            email,
            password: hashedPassword
        });
        return result.insertId;
    }

    async login(email, password) {
        const [rows] = await this.pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length == 0) {
            return null;
        }
        const user = rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return null;
        }
        return user;
    }

    async logout(userId) {
        console.log(`User ${userId} logged out (placeholder for session/token invalidation)`);
    }
}

module.exports = User;
