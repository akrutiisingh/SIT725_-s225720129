var express = require("express")
const path = require('path'); // Make sure to include this
var app = express()
var port = process.env.port || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// GET endpoint to calculate the square of a number
// Example: http://localhost:3000/square?num=5
app.get('/square', (req, res) => {
  const num = parseFloat(req.query.num);
  
  if (isNaN(num)) {
    return res.send("Error: Please provide a valid number using query parameter 'num'.");
  }
  
  const square = num * num;
  res.send(`The square of ${num} is: ${square}`);
});

// GET endpoint to add two numbers
// Example: http://localhost:3000/add?a=5&b=3
app.get('/add', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.send("Error: Please provide valid numbers using query parameters 'a' and 'b'.");
  }

  const sum = a + b;
  res.send(`The sum of ${a} and ${b} is: ${sum}`);
});

// Subtract
app.get('/subtract', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.send("Invalid input");
  }

  const subtraction = a - b;
  res.send(`The difference of ${a} and ${b} is: ${subtraction}`);
});

// Multiply
app.get('/multiply', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.send("Invalid input");
  }

  const multiplication = a * b;
  res.send(`The product of ${a} and ${b} is: ${multiplication}`);
});

// Divide
app.get('/divide', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b) || b === 0) {
    return res.send("Invalid input or division by zero");
  }

  const division = a / b;
  res.send(`The quotient of ${a} and ${b} is: ${division}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});