const mongoose = require('mongoose');
const mongoUri= process.env.MONGO_URI

console.log(process.env.PORT)
export const connectToMongo = () => {
    mongoose.connect(mongoUri).then(() => {
        console.log('connected to Mongo')
    })
}

