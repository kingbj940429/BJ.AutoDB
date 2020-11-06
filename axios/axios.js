const axios = require('axios');

const Axios = async (url_json,standard_key) => {
  try {
    var result = await axios.get(url_json);
    var temp = {};
    for(var k in result){
      if(k == standard_key){
        console.log("잇습니다");
      }
    }
    result = result.data[`${standard_key}`];
    
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = Axios;