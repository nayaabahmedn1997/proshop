const mongoose  = require('mongoose');
const dotenv  = require('dotenv');
const colors  = require('colors');
const userModel  = require('./models/userModel');
const productsModel  = require('./models/productModel');
const products  =require('../data/products');
const users  =require('../data/users');
const connectDB = require('./config/db');
const orderModel = require('./models/ordermodel');


dotenv.config();

;
const importData = async ()=>{
    try {
        await connectDB();
       await orderModel.deleteMany();
        await productsModel.deleteMany();
        await userModel.deleteMany();

        console.log(users)
        const createUsers = await userModel.insertMany(users);
        const adminUser =createUsers[0]._id;

        const sampleProducts = products.map((product)=>{
            return {
                ...product,
                user: adminUser
            }
        });
        console.log(sampleProducts)
        await productsModel.insertMany(sampleProducts);
        console.log("Data Imported".green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData= async ()=>{
    try {
        await connectDB();
    //    await orderModel.deleteMany();
        await productsModel.deleteMany();
        await userModel.deleteMany();

        console.log(`Data Destroyed`.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if( process.argv[2] === '-d')
{
    destroyData();
}
else{
    importData();
}