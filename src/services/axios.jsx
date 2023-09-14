import axios from 'axios';



// later check login from the token in local storage
const baseUrl = process.env.REACT_APP_BACKEND_URL

const getRequest = async (link) => {
    try {
        console.log(baseUrl);
        const finalUrl = `${baseUrl}/${link}`
        const response = await axios.get(finalUrl);
        return response.data;
    } catch (err) {
        console.log(err)
    }
}

const postRequest = async (link, data) => {
    try {
        debugger;
        console.log(baseUrl);
        const finalUrl = `${baseUrl}/${link}`
        const response = await axios.post(finalUrl, data);
        return response.data;

    } catch (err) {
        console.log(err)
    }
}

export default  {
    getRequest,
    postRequest
}
