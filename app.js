var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//Talk to console
var exec = require('child_process').exec, child;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


//Routes

app.post("/api/garage/openclose" , function (req , res )
{
  res.send(200);
  startGarageDoorLoop();
});

function startGarageDoorLoop()
{

   openOrCloseDoor( 'gpio write 7 0' );

   setTimeout( openOrCloseDoor('gpio write 7 1'), 5000)
}

function openOrCloseDoor( gpioCommandIn )
{

  var gpioCommand = gpioCommandIn;

  child = exec( gpioCommand,
      function (error, stdout, stderr) {
        if(stdout!==''){
          console.log('---------stdout: ---------\n' + stdout);
        }
        if(stderr!==''){
          console.log('---------stderr: ---------\n' + stderr);
        }
        if (error !== null) {
          console.log('---------exec error: ---------\n[' + error+']');
        }
      });

}



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
