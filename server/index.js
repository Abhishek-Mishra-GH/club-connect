const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const clubRoutes = require('./routes/clubRoutes');
const searchRoutes = require('./routes/searchRoutes');
const eventRoutes = require('./routes/eventRoutes');
const profileRoutes = require("./routes/profileRoutes");
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use((req, res, next) => {
  console.log(`Incoming request to ${req.url}`);
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/profile/', profileRoutes);
app.use('/api/posts', postRoutes);

app.get('/api/hello', (req, res) => {
  // test 
  res.send("hello, world");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});