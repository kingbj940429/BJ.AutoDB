const axios = require('axios');

const Axios = async (url_json, standard_key, standard_key_child) => {
  try {
    var result = await axios.get(url_json);
    var CHECK = true;
    test = result.data;
    var graph= {};
    

    if(Array.isArray(standard_key_child)==false && standard_key_child != undefined){
      console.log("키값이 배열로 만들었습니다.");
      var temp =[];
      temp.push(standard_key_child);
      standard_key_child = temp;
    }
    test = test[`${standard_key}`];
    
    if(standard_key_child){
      for(var k=0;k< standard_key_child.length;k++){
        test = test[`${standard_key_child[k]}`];
      }
      obj = {};
      obj[`${standard_key_child[k-1]}`] = test;
      test = obj;
    }else{
      test = result.data[`${standard_key}`];
    }
    
    
    
    // graph.first = Object.keys(test);
    // test = test[`${graph.first[3]}`];

    // graph.second = Object.keys(test);
    // test = test[`${graph.second[3]}`];
  

    // graph.third = Object.keys(test);
    // test = test[`${graph.third[6]}`];
   

    // graph.fourth = Object.keys(test);
    // test = test[`${graph.fourth[6]}`];
 
  
  
    
    // for(var k in Object.keys(test)){
    //   graph[`${k}`] = Object.keys(test);
    //   console.log(graph);
    //   test = test[`${graph[`${k}`][2]}`];
    // }


    // test = test[`data`];
    // test  = test['SummonerTeleport'];
    // test  = test['id'];
    
    

    // if (result.data.hasOwnProperty(standard_key) == false) {
    //   for (var key1 in result.data) {
    //     for (var key2 in key1) {
    //       //console.log(key2);
    //     }
    //   }
    //   query_status = '기준 키값이 객체에 없습니다.';
    //   res.json({
    //     query_status
    //   });
    //   throw '기준 키값이 객체에 없습니다.';
    // } else {

    // }


   
    return test;
  } catch (error) {
    console.error(error);
  }
};

module.exports = Axios;