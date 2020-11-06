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

/**
 * 모든 컬럼에 데이터 삽입
 */
router.post('/success', async (req, res, err) => {
    const temp = await axios(req.body.url_json);
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
    
    /**
     * 모든 객체명에 맞게 테이블 생성
     */
    var str='';
    var keys= [];
    str = `CREATE TABLE ${req.body.table_name}(`
    for(var key in temp){
        var keyObj = temp[key];
        for(var key2 in keyObj){
            key2+="_bj";
            keys.push(key2);
            str += key2 + " VARCHAR(1000), ";
        }
        break;
    }
    str = str.trim();//양쪽 공백 제거
    str = str.substr(0, str.length -1);//맨 뒤에 콤마 없애기  
    str = str + ");"
    await dbPool(str);

    /**
     * 모든 객체명에 맞게 데이터 INSERT 실행
     */
    var insert_query = `INSERT INTO ${req.body.table_name}(`;

    var str='';
    var keys= [];
   
    for(var key in temp){
        var keyObj = temp[key];
        for(var key2 in keyObj){
            keys.push(key2);
            str += key2 + "_bj, ";
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
       
        query_status = await dbPool(`${insert_query}`);
        /**
         * 쿼리 성공 / 실패 처리 관련
        */
        if(query_status == false){
            query_status = '퀴리 오류! 다시 확인 해주세요';
            res.json({query_status});
            throw '퀴리 오류! 다시 확인 해주세요';
        }else{
            query_status = "쿼리 성공!";
        }
       
    }
   
    res.json({query_status});
});

/**
 * 추가한 컬럼에만 데이터 삽입
 */

router.post('/success_part', async (req, res, err) => {
    const temp = await axios(req.body.url_json);
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
            console.error('Query Error');
            connection.release();
            return false;
        }
    };
    /**
     * 입력한 객체명에 맞게 테이블 생성
     */

    /**
     * 입력한 객체명에 맞게 데이터 INSERT 실행
     */
    var insert_query_front = `INSERT INTO ${req.body.table_name}(`;
    var str = ''
    var keys = [];
    
    if(req.body.column){
        str += req.body.column + ', ';
        keys.push(req.body.column );
    }else{
        for(var k in req.body['column[]']){
            str += req.body[`column[]`][k] + ', ';
            keys.push(req.body[`column[]`][k]);
        }
    }
    
    str = str.trim();//양쪽 공백 제거
    str = str.substr(0, str.length -1);//맨 뒤에 콤마 없애기
    str = str + ')';
    insert_query_front = insert_query_front + str + ' VALUES(';
   
    for(var key in temp){
        var keyObj = temp[key];
        var str2 = '';
        var insert_query;
        for(var k in keys){
            str2 += '"'+keyObj[`${keys[k]}`] + '",';
        }
        str2 = str2.trim();//양쪽 공백 제거
        str2 = str2.substr(0, str2.length -1);//맨 뒤에 콤마 없애기
        insert_query = insert_query_front + str2 + ');'
        query_status = await dbPool(insert_query);
        /**
         * 쿼리 성공 / 실패 처리 관련
        */
        if(query_status == false){
            query_status = '퀴리 오류! 다시 확인 해주세요';
            res.json({query_status});
            throw '퀴리 오류! 다시 확인 해주세요';
        }else{
            query_status = "쿼리 성공!";
        }
    }

  
    res.json({query_status});
});




module.exports = router;
