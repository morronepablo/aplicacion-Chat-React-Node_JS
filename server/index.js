const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoute = require('./Routes/userRoute')

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

//Rutas
app.use('/api/users', userRoute);

//CRUD

app.get('/', (req, res) => {
    res.send("Welcome our chat app APIs...")
})

const PORT = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(PORT, (req, res) => {
    console.log(`Server running on port: ${PORT}`);
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDb connection established"))
  .catch((error) => console.log("MongoDb connection Failed: ", error.message))

