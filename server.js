const express = require('express');
const app = express();

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('Something is happening. ' + req.url);
    next();
});

console.log('started on port 8080');
app.listen(8080);
