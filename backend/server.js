const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

// Adding a middleware (this used to not be included with Express, we used to have to install the body parser separately, but 2 years ago Express started including it with the package)
// If only this line, the function (such as registerUser where it gets the body from the request) will give you 'undefined'
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
// The end point for that file is 'api/users'
app.use('/api/users', require('./routes/userRoutes'));

// The end point for that file is 'api/tickets'
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  );
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ messsage: 'Welcome to the Support Desk API' });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
