import axios from 'axios';

export default axios.create({
    baseURL: base_url + 'api',
    headers: {
        "Content-type": "application/json"
    }
})
