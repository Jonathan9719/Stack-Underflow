const path = require('path');
const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
require('dotenv').config();


const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://dbUser:es7L2FAaTgOMsBnE@cluster0.bu1ns.mongodb.net/stackUnderflow?retryWrites=true&w=majority'

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

// routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'this is a secret', 
    resave: false, 
    saveUninitialized: false, 
    store: store
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
  .then(user => {
    if (!user){
      return next();
    }
    req.user = user;
    next();
  })
  .catch(err => {
    next(new Error(err));
  });
});


app.use('/admin', adminRoutes);
app.use(blogRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500)

app.use(errorController.get404);

app.use((error, req, res, next) => {
  res.redirect('/500');
});

const corsOptions = {
    origin: "https://weekly-code.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
    family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://dbUser:es7L2FAaTgOMsBnE@cluster0.bu1ns.mongodb.net/stackUnderflow?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URL,options)
.then(result => {  
  app.listen(process.env.PORT || 3000);
})
.catch(err => {
  console.log(err);
});