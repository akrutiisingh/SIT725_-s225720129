var express = require("express")
var app = express()
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Calculator function to multiply ingredient amounts based on the number of servings
const multiplyIn = (baseAmt, multiplier) => {
    if (typeof baseAmt !== 'number' || typeof multiplier !== 'number') {
        return null;
    }
    if (baseAmt < 0 || multiplier < 0) {
        return 0;
    }
    return baseAmt * multiplier;
};

// API endpoint to multiply ingredient amounts based on the number of servings
app.get('/multiply', (req, res) => {
    let baseAmt = parseFloat(req.query.baseAmt);
    let multiplier = parseFloat(req.query.multiplier);

    let result = multiplyIn(baseAmt, multiplier);

    if (result === null) {
        return res.status(400).send("Invalid input: Please provide numbers.");
    }
    
    res.status(200).send("The total amount is: " + result);
});

//API endpoint to retrieve pasta recipes
app.get('/api/recipes', (req, res) => {
    const pastaRecipes = [
        { id: 1, name: 'Spaghetti Bolognese', servings: 2 },
        { id: 2, name: 'Penne Arrabbiata', servings: 1 },
        { id: 3, name: 'Fettuccine Alfredo', servings: 4 }
    ];
    res.status(200).json({ data: pastaRecipes, message: 'Recipes retrieved successfully' });
});


var port = process.env.port || 3000;
app.listen(port,()=>{
console.log("App listening to: "+port)
})

//Exporting for Mocha tests
module.exports = { app, multiplyIn };