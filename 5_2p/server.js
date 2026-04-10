const express = require('express');
const app = express();
const bookRoutes = require('./routes/books.routes');

app.use(express.static('public'));
app.use(express.json());

// Mount the routes
app.use('/api/books', bookRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});