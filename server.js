require('dotenv').config();
import { json } from "express";
import cors from "cors";
import { json as _json } from "body-parser";
const PORT = process.env.PORT;

// Middleware to parse JSON
app.use(json());
app.use(cors());
app.use(_json());
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
