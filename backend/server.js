const express = require('express')
const app =express()
require('dotenv').config();
const port =process.env.PORT ||3000;

const mysql=require('mysql2/promise')
async function Dbconnection() {
    try {
        const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
  
      console.log('Database connection successful!');
      await connection.end();
    } catch (error) {
      console.error('Database connection failed:', error);
      process.exit(1); 
    }
  }



const User = require('./models/user');
const userRouter = require('./routes/users');


const handleErrors = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
};

app.use('/users', userRouter);

// ... other server setup code (e.g., middleware)

// Apply error handling middleware as the last app.use()
app.use(handleErrors);


  Dbconnection().then(() => {
    app.get('/', (req, res) => {
        res.send('Train Reservation Backend is running');
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});





