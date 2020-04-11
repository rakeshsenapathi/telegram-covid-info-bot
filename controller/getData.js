const types = require('../types');
const axios = require('axios');
require('dotenv').config();


// TODO: Implement Global Data 
const getGlobalData = () => {
    return new Promise((resolve, reject) => {
        axios({
            "method": "GET",
            "url": "https://covid-19-data.p.rapidapi.com/totals",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                "x-rapidapi-key": `${process.env.RAPID_API_TOKEN}`
            }, "params": {
                "format": "undefined"
            }
        })
            .then((response) => {
                const payload = {
                    confirmed: response.confirmed,
                    recovered: response.recovered,
                    critical: response.critical,
                    deaths: response.deaths
                }
                resolve(payload);
            })
            .catch((error) => {
                reject(error);
            })
    });
};


const getStats = (data, callback) => {

    /**TODO:
     * Instead of hardcoding i.e taking the last index for the latest date,
     * do date manipulation and getTodays Date.
    **/

    const latest_index = data.length - 1;

    // Create a new object
    const payload = {
        total_confirmed: data[latest_index].totalconfirmed,
        total_deceased: data[latest_index].totaldeceased,
        total_recovered: data[latest_index].totalrecovered,
        daily_confirmed: data[latest_index].dailyconfirmed,
        daily_deceased: data[latest_index].dailydeceased,
        daily_recovered: data[latest_index].dailyrecovered,
        latest_stats_date: data[latest_index].date,
    }

    callback(payload);

}

const setData = (type) => {
    if (type === 1) {
        return new Promise((resolve, reject) => {
            axios.get(types.COVID_API_URL_SUMMARY)
                .then(response => getStats(response.data.cases_time_series, (payload) => {
                    resolve(`Total Confirmed : ${payload.total_confirmed}\t\nTotal Deceased  : ${payload.total_deceased}\t\nTotal Recovered : ${payload.total_recovered}\nType any key to display menu.`);
                }))
                .catch(err => reject("Could not fetch Results"));
        });
    }
    else if (type == 2) {
        return new Promise((resolve, reject) => {
            axios.get(types.COVID_API_URL_DAILY)
                .then(response => getStats(response.data.cases_time_series, (payload) => {
                    resolve(`Latest date for stats : ${payload.latest_stats_date}\t\nDaily Deceased  : ${payload.daily_deceased}\t\nDaily Confirmed : ${payload.daily_confirmed}\nDaily Recovered : ${payload.daily_recovered}\t\nType any key to display menu.`);
                }))
                .catch(err => reject("Could not fetch Results"));
        });
    }
    else {
        return getGlobalData()
            .then(payload => {
                return `Confirmed : ${payload.confirmed} \t\n Critical : ${payload.critical} \t\n Recovered : ${payload.recovered} \t\n Deaths : ${payload.deaths} \t\n Type any key to display menu`
            })
            .catch(err => "Could not fetch result");
    }
};



module.exports = delegateApiCall = (category) => {
    switch (category) {
        case types.GET_SUMMARY:
            return setData(1);
        case types.GET_LATEST_DAILY_STATUS:
            return setData(2);
        case types.GET_GLOBAL_DATA:
            return setData(3);
    }
}

