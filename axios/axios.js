const axios = require('axios');

const Axios = async (url_json) => {
  try {
    var result = await axios.get(url_json);
    result = result.data.data
   
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = Axios;