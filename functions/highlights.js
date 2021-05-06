require('dotenv').config();

const API_KEY = process.env.YOUTUBE_API_KEY;
const API_ENDPOINT = process.env.YOUTUBE_API_ENDPOINT + API_KEY;

const axios = require('axios').default;

exports.handler = async () => {
    try {
        const res = await axios.get(API_ENDPOINT);

        return {
            headers: { 'Content-Type': 'application/json' },
            statusCode: res.status,
            body: JSON.stringify(res.data)
        };
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
                error: err.message
            })
        };
    }
};
