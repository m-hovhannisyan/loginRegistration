const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');
const session = require('express-session');
const router = require('./router')
//jamanakavor hasceic texapoxum enq himnakan hasce

app.set('view engine' , 'ejs')
app.set('views' , 'view')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({   
    secret: 'keyboard cat',  
    resave: false,  
    saveUninitialized: true 
}))
app.use(router)


app.listen(8000)
 