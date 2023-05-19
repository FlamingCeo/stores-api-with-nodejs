require('dotenv').config()
//async errors


 
const express = require('express');
const app = express();

const connectDB = require('./db/connect')
const productRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.json())

//routes

app.get('/',(req,res) => {
    res.send('<h1>Hello</h1>')
}) 
 
app.use('/api/v1/products',productRouter)


//products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT||3000

const start = async() =>{
    try {
        //connectDb
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening to port ${port}`))
    } catch (error) {
        console.log(error)
    }


}

start();
