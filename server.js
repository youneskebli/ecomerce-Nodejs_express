const express = require('express');
const dotenv= require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
dotenv.config({path:'config.env'});
const dbConnection  =require('./config/databaseConf')
const categoryRoute = require('./routes/CategoryRoute')
const subCategoryRoute = require('./routes/subCategoryRoute')
const ApiError = require('./utils/ApiError')
const globalError = require('./middlewares/errorMiddleware');
const brandRoute =require('./routes/brandRoute');
const productRoute = require('./routes/productRoute')

//connect with the db
dbConnection()
//express app
const app= express();

if (process.env.NODE_ENV === 'DEVELOPMENT' ) {
    app.use(morgan('dev'))
    console.log(`mode:${process.env.NODE_ENV}`)
}
const PORT= process.env.PORT || 8080
const server= app.listen(PORT,()=>{
    console.log('hello from terminal')
})
//midllewares
app.use(express.json());
//mount routes
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/products',productRoute)
app.all('*',(req,res,next)=>{
    next(new ApiError(`can't find this route :${req.originalUrl}`,400))
});

// use the global error handler
app.use(globalError)

// Handle rejection outside express
process.on('unhandledRejection',(err)=>{
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`)
    server.close(()=>{
        console.error(`Shutting down....`);
        process.exit(1)
    })

})




