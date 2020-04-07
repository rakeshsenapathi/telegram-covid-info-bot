"use strict"

// Import dependencies, Setup http server, setup telegram-bot api
require('dotenv').config();
const express = require('express'),
    bodyParser = require('body-parser'),
    TelegramBot = require('node-telegram-bot-api'),
    app = express(),
    bot = new TelegramBot(process.env.TELEGRAM_ACCESS_TOKEN, { polling: true });

// Parse application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

bot.on("text", function (message) {
    bot.sendMessage(message.chat.id, "Hello World");
});

// Set the listening port.
app.set('PORT', process.env.PORT || 5000);

app.get('/', function (req, res) {
    res.send("Home")
});

// Listen for requests
app.listen(app.get('PORT'), function () {
    console.log("Your app is listening port : " + app.get('PORT'))
});


