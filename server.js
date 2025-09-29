require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON
app.use(express.json());

// Routes
// const userRoutes = require('./routes/userRoutes');
// app.use('/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to My Node.js App');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
