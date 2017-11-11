var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var hackathon = require('./routes/hackathon');
var user = require('./service/user/UserRoute');
var statistic = require('./service/statistic/StatisticRoute');
var status = require('./service/status/StatusRoute');
var mbed = require('./service/mbed/MbedRoute');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: true,
  methods: ['GET', 'PUT', 'POST']
}));

app.use('/', index);
app.use('/hackathon', hackathon);
app.use('/user', user);
app.use('/statistic', statistic);
app.use('/status', status);
app.use('/mbed', mbed);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
