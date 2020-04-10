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
    bot.sendMessage(message.chat.id, 'Hi, Welcome to INDIA COVID-19 TRACKER - A CROWDSOURCED INITIATIVE'
        , {
            reply_markup: {
                inline_keyboard: [
                    {
                        text: 'Get Summary!',
                        callback_data: 'get_summary'
                    },
                    {
                        text: 'Get State Wise Stats',
                        callback_data: 'get_state_wise_stats'
                    }
            }
        });
});

// Set the listening port.
app.set('PORT', process.env.PORT || 5000);

app.get('/', (req, res) => res.send("Home"));

// Listen for requests
app.listen(app.get('PORT'), () => console.log("Your app is listening port : " + app.get('PORT')));


