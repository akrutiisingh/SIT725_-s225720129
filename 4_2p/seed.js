const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myprojectDB');

const projectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String
});

const Project = mongoose.model('Project', projectSchema);

const sampleProject = new Project({
    title: "Penne Arrabbiata",
    image: "images/penne.jpg",
    link: "View Recipe",
    description: "The sauce gets its heat from dried red chili peppers."
});


sampleProject.save().then(() => console.log("Sample project saved!"));
