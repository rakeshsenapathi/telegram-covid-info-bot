"use strict"

// Import dependencies, Setup http server, setup telegram-bot api
require('dotenv').config();
const express = require('express'),
    { urlencoded, json } = require('body-parser'),
    TelegramBot = require('node-telegram-bot-api'),
    TYPES = require('./types'),
    app = express(),
    axios = require('axios'),
    delegateApiCall = require('./controller/getData'),
    bot = new TelegramBot(process.env.TELEGRAM_ACCESS_TOKEN, { polling: true });

// Parse application/x-www-form-urlencoded
app.use(
    urlencoded({
        extended: true
    })
);

app.use(json);

bot.on("message", (message) => {
    bot.sendMessage(message.chat.id, 'Hi, Welcome to INDIA COVID-19 TRACKER - A CROWDSOURCED INITIATIVE'
        , {
            reply_markup: {
                inline_keyboard: [[
                    {
                        text: 'GET SUMMARY',
                        callback_data: TYPES.GET_SUMMARY
                    }
                ],
                [
                    {
                        text: 'GET LATEST DAILY STATUS',
                        callback_data: TYPES.GET_LATEST_DAILY_STATUS
                    }
                ],
                [
                    {
                        text: 'GET GLOBAL DATE',
                        callback_data: TYPES.GET_LATEST_DAILY_STATUS
                    }
                ]]
            }
        });
});

bot.on('callback_query', (callbackQuery) => {

    const message = callbackQuery.message,
        category = callbackQuery.data;

    delegateApiCall(category)
        .then((response) => bot.sendMessage(message.chat.id, response))
        .catch(err => bot.sendMessage(message.chat.id, "Cannot fetch details"))

});

bot.on("polling_error", (err) => console.log(err));

// Set the listening port.
app.set('PORT', process.env.PORT || 5000);

app.get('/', (req, res) => res.send("Home"));

// Listen for requests
app.listen(app.get('PORT'), () => console.log("Your app is listening port : " + app.get('PORT')));


