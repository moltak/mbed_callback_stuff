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

var bus = require(path.resolve('bus'));

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

const TOKEN = '409441372:AAHoPnS6CQFoBQ4GSRT1Tl8YjeY7xA-TQFk';
const url = 'https://fa5e5b0d.ngrok.io';
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(TOKEN);

bot.setWebHook(`${url}/bot${TOKEN}`);

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});


const telegramId = ['475982712', '422403867', '474215211', '24177202'];
/**
 * subscribe! 
 */
bus.subscribe(
  function (status) {
    const str = `${status.user.firstName} is ${status.status}`; 

    telegramId.forEach(id => {
      bot.sendMessage(id, str);
      bot.sendLocation(id, status.lat, status.lng);
    });
  },
  function (err) {
    console.log('Error: ' + err);
  },
  function () {
    console.log('Completed');
  });

let chatId;
// Just to ping!
bot.on('message', msg => {
  chatId = msg.chat.id;
  bot.sendMessage(msg.chat.id, 'I am alive!');
  console.log(chatId);
});

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
