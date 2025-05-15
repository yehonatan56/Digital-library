const express = require('express');
const app = express();

// Middleware function
const logRequest = (req, res, next) => {
    console.log(`Received  ${req.method} request from ${req.ip}`
    );
    next();
};

// Use the middleware
app.use(logRequest);

// Route handler
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});