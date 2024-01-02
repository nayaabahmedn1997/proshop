const cors  = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const products =require('../data/products');
const connectDB = require('./config/db');
const productRouter = require('./routes/productRoutes');
const { notFound, errorhandler } = require('./middleware/errorMiddleware');
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB(); //Connect to Mongo DB
const app  = express();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use('/api/products',productRouter);
app.use(notFound);
app.use(errorhandler);

app.get("/",(req, res)=>{
    res.send("Hello world!");
});



app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})