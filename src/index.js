const express = require('express');
const app = express();
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash')
const session = require('express-session')
const mysqlStore = require('express-mysql-session')

const {database} = require('./key')

//settings

app.set('port', process.env.PORT || 3000); // configuracion del puerto
app.set('views', path.join(__dirname,'views')); //donde esta la carpeta views
    //configuracion de handlebarss
app.engine('.hbs',  exphbs({

    defaultLayout: 'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views') , 'partials'),
    extname:'hbs',
    helpers:require('./lib/handlebars'),

}));
app.set('view engine', '.hbs');

//middlewares
app.use(session({
    secret: 'mcm',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//global variables

app.use((req ,res ,next)=>{
    app.locals.success = req.flash('success');
    next();
})

//routes
app.use(require('./routes'));
app.use(require('./routes/authentication.js'));
app.use('/links', require('./routes/links.js'));

//public

app.use(express.static(path.join(__dirname,'public')))

//starting the server
app.listen(app.get('port') , (req , res)=>{

    console.log('El servidor esta en funcionamiento');

});

