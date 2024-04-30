const express = require('express');
const app = express();
const {add, subtract, multiply, divide} = require('./calculator');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to API calculator. Here you can perform basic arithmetic operations. Your API requests should target one of 4 possible URLs listed below, each corresponds to a math operation. You should also provide a request body in the format listed below",
        possibleURLs: [
            "/add",
            "/subtract",
            "/multiply",
            "/divide"
        ],
        exampleBody: {
            a: 5,
            b: 10
        }
        
    })
})

// middleware that fails if wrong data is provided
app.use((req, res, next) => {
    const {a, b} = req.body;
    if (!a || !b) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a and b values in the request body'
        });
    }
    // if either a or b isnt a number, fail
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({
            success: false,
            message: 'a and b must be numbers'
        });
    }
    // convert a and b to numbers and add them to request
    req.a = Number(a);
    req.b = Number(b);
    next();
})

app.get('/add', (req, res) => {
    const {a, b} = req;
    res.json({
        success: true,
        message: 'Success',
        result: add(a, b)
    })
})

app.get('/subtract', (req, res) => {
    const {a, b} = req;
    res.json({
        success: true,
        message: 'Success',
        result: subtract(a, b)
    })
})

app.get('/multiply', (req, res) => {
    const {a, b} = req;
    res.json({
        success: true,
        message: 'Success',
        result: multiply(a, b)
    })
})

app.get('/divide', (req, res) => {
    const {a, b} = req;
    res.json({
        success: true,
        message: 'Success',
        result: divide(a, b)
    })
})

app.listen(5080, () => {
    console.log('Server is running on port 5080');
});