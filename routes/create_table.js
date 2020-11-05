var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');

/* GET home page. */
router.post('/', function (req, res, next) {
    var schema_info = {
        host: req.body.host,
        user: req.body.user,
        password: req.body.password,
        schema: req.body.schema,
    }
    res.render('create_table',schema_info);
});

router.post('/success', async (req, res, err) => {
    //console.log(req.body['column[]']);
    var create_table_query = `CREATE TABLE ${req.body.table_name}(`
    var temp='';
    for(var k in req.body['column[]']){
        temp += req.body['column[]'][k] + " VARCHAR(100), ";
    }

    temp = temp.trim();//양쪽 공백 제거
    temp = temp.substr(0, temp.length -1);//맨 뒤에 콤마 없애기
    
    create_table_query = create_table_query + temp + ");"//최종 쿼리
    
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

    await dbPool(create_table_query);
    res.json({title : 'title'});
});




module.exports = router;
