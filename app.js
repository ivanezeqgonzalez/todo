import express from 'express';
import router from './routes/index.js';
import bodyParser from 'body-parser';

// Set up  
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}!`)
});