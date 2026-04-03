var express = require("express")
var app = express()
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// const cardList = [
//   {
//     title: "Penne Arrabbiata",
//     image: "images/penne.jpg",
//     link: "View Recipe",
//     description: "The sauce gets its heat from dried red chili peppers and is usually served with Penne pasta."
//   },
//   {
//     title: "Fettuccine Alfredo",
//     image: "images/fetucinne.jpg",
//     link: "View Recipe",
//     description: "Rich and creamy pasta with butter, cream, and Parmesan cheese."
//   }
// ];
// app.get('/api/projects',(req,res) => {
// res.json({statusCode: 200, data: cardList, message:"Success"})
// })

// var port = process.env.port || 3000;
// app.listen(port,()=>{
// console.log("App listening to: "+port)
// })
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myprojectDB', {
useNewUrlParser: true,
useUnifiedTopology: true,
});
mongoose.connect('mongodb://127.0.0.1:27017/myprojectDB');
mongoose.connection.on('connected', () => {
console.log('Connected to MongoDB!');
});

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
console.log(`App listening on port ${port}`);
});



