"use strict"

// Import dependencies, Setup http server, setup telegram-bot api
require('dotenv').config();
const express = require('express'),
    { urlencoded, json } = require('body-parser'),
    TelegramBot = require('node-telegram-bot-api'),
    app = express(),
    bot = new TelegramBot(process.env.TELEGRAM_ACCESS_TOKEN, { polling: true });

// Parse application/x-www-form-urlencoded
app.use(
    urlencoded({
        extended: true
    })
);
app.use(json);

bot.on("message", (message) => {
    bot.sendMessage(message.chat.id, 'Hi, INDIA COVID-19 TRACKER - A CROWDSOURCED INITIATIVE'
        , {
            'reply_markup': {
                'keyboard': [['Get Summary'], ['Get State Wise Stats']],
                resize_keyboard: true,
                one_time_keyboard: false,
                force_reply: true,
            }
        });
});

// Set the listening port.
app.set('PORT', process.env.PORT || 5000);

app.get('/', (req, res) => res.send("Home"));

// Listen for requests
app.listen(app.get('PORT'), () => console.log("Your app is listening port : " + app.get('PORT')));


