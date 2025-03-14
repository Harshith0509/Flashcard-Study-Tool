const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
console.log("DB_CONNECTION:", process.env.DB_CONNECTION);
const port = process.env.PORT || 5001;
var corsOptions = {
  origin: process.env.ORIGIN_URL
};
app.use(cors(corsOptions));
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
require('./routes/auth.routes')(app);
require('./routes/card.routes')(app);

const mongoose = require( 'mongoose' )
mongoose.connect( process.env.ATLAS_URI )
mongoose.set("strictQuery", true); 
const db = mongoose.connection
db.on( 'error', error => console.error( error ) )
db.once( 'open', error => console.log( 'Connected to Mongoose' ) )

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


