const axios = require('axios');

const Axios = async (url_json, standard_key, standard_key_child, key_index) => {
  try {
    var result = await axios.get(url_json);

    test = result.data;

    /**
     * 키값이 하나일 때 처리
     */
    if (Array.isArray(standard_key_child) == false && standard_key_child != undefined) {
      console.log("키값을 배열로 만들었습니다.");
      var temp = [];
      temp.push(standard_key_child);
      standard_key_child = temp;
    }
    test = test[`${standard_key}`];
    if (Array.isArray(test)) {
      console.log(`${standard_key}는 배열입니다.`);
    }
    /**
     * 추가로 키값을 생성했을 때 처리
     */
    if (standard_key_child) {
      for (var k = 0; k < standard_key_child.length; k++) {
        test = test[`${standard_key_child[k]}`];
      }
      /**
       * 최종 키값이 배열일때 처리
       */
      if (Array.isArray(test)) {
        if (test[0][0] != undefined) {
          console.log(`${test[0][0]}은 undefined입니다.`);
          var test_obj = {}
          for (var k in test) {
            test_obj[`${k}`] = test[k];
          }
          var test_arr = []
          test_arr.push(test_obj);
          return test_arr;
        }
        console.log(`${standard_key_child[k-1]}는 배열입니다.`);
        console.log(test);
        return test;
      }
      obj = {}
      obj[`${standard_key_child[k-1]}`] = test;

      test = obj;
    } else {
      test = result.data[`${standard_key}`];
    }
    return test;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = Axios;