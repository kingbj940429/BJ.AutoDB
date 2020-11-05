var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');
const axios = require('../axios/axios');

/* GET home page. */
router.post('/', function (req, res, next) {
    var schema_info = {
        host: req.body.host,
        user: req.body.user,
        password: req.body.password,
        schema: req.body.schema,
    }
    res.render('url_json',schema_info);
});

router.post('/success', async (req, res, err) => {
     /**
     * DB 관련
     */
    const pool = mysql.createPool({
        host: req.body.host,
        user: req.body.user,
        password: req.body.password,
        database: req.body.schema,
    });

    const dbPool = async (queries) => {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows] = await connection.query(queries);
            connection.release();
            return rows;
        } catch (err) {
            console.log('Query Error');
            connection.release();
            return false;
        }
    };

    const temp = await axios(req.body.url_json);
    //INSERT INTO 테이블명(컬럼,컬럼) VALUES ('','값');
    var insert_query = `INSERT INTO ${req.body.table_name}(`;

    var str='';
    var keys= [];
    // for(var k in req.body['column[]']){
    //     str += req.body['column[]'][k] + ", ";
    // }
    for(var key in temp){
        var keyObj = temp[key];
        for(var key2 in keyObj){
            var keyObj2 = temp[key2];
            keys.push(key2);
            str += key2 + ", ";
        }
        break;
    }
    str = str.trim();//양쪽 공백 제거
    str = str.substr(0, str.length -1);//맨 뒤에 콤마 없애기
    insert_query_front = insert_query+str+") VALUES (";
    
    var result='';
    
    for(var key in temp){
        var str2 = '';
        insert_query = '';
        var keyObj = temp[key];
        for(var k in keys){
            str2 += '"'+keyObj[`${keys[k]}`] + '",';
        }
        insert_query = insert_query+str+") VALUES (";
        str2 = str2.trim();//양쪽 공백 제거
        str2 = str2.substr(0, str2.length -1);//맨 뒤에 콤마 없애기  
        insert_query = insert_query_front + str2 + ");"; 
        insert_query = insert_query.replace("key","key_1");
        insert_query = insert_query.replace("name","name_1");
        insert_query = insert_query.replace("into","into_1");
        await dbPool(`${insert_query}`);
    }
    console.log(insert_query);
    res.json({title : 'title'});
});




module.exports = router;
