require('dotenv').config();

const API_ENDPOINT = process.env.NBA_API_ENDPOINT;
const axios = require('axios').default;

exports.handler = async (event) => {
    try {
        const url = API_ENDPOINT + event.queryStringParameters.date;

        const res = await axios.get(url);

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
