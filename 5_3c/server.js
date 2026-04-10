const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bookRoutes = require('./routes/books.routes');

const mongoURI = 'mongodb://localhost:27017/bookCatalog';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(express.static('public'));
app.use('/api/books', bookRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));