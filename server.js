if(process.env.NODE_ENV!=="production"){
    require('dotenv').config();
}
//require('dotenv').config();
const express = require('express');
const app = express();
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');

app.set('view engine','ejs');
app.set('views', __dirname+'/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({limit : '10mb', extended : false}))


const mongoose = require('mongoose');
console.log(process.env.DATABASE_URL);
// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser : true})
// .then((result) => {
//     console.log('Connected', result);
// })
// .catch((error) => {
//     console.log('Error', error);
// });
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Mongoose Connected Successfully'))

app.use('/', indexRouter);
app.use('/authors', authorsRouter);

app.listen(process.env.PORT || 3001);