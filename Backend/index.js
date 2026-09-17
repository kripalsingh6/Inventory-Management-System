
import express from "express";
import connectMongDb from "./config/model.config";
import 'dotenv/config';

import productRoutes from './routes/products.route.js';
const app = express();
const port = 3000;

//DataBase connection
connectMongDb();

app.use(express.json());

app.use('/products',productRoutes);

app.get("/" , (req,res)=>{
    res.send("server is starting");
})
app.listen(port,(req,res)=>{
    console.log(`port is listening ${port}`)
})
