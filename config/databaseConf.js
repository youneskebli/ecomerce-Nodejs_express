const mongoose = require('mongoose')

const DatabaseConfig=()=> {
    mongoose.connect(process.env.DB_URL)
        .then((con) => console.log(`DataBase connected : ${con.connection.host}`))
        .catch((err) => {
            console.error(`Database error : ${err}`);
            process.exit(1)
        })
}
module.exports = DatabaseConfig