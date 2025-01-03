const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const clubRoutes = require('./routes/clubRoutes');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`Incoming request to ${req.url}`);
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/clubs', clubRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});