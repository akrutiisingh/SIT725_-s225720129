const express = require("express");
const mongoose = require('mongoose');
const app = express();


const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const uri = 'mongodb://127.0.0.1:27017/myprojectDB';
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('MongoDB connection error:', err));


const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});
const Project = mongoose.model('Project', ProjectSchema);


app.get('/api/projects', async (req, res) => {
        const projects = await Project.find({});
        res.json({ statusCode: 200, data: projects, message: 'Success' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});