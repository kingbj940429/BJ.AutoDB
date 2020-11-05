var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/connect', (req, res, err) => {

  var schema_info = {
    host: req.body.host,
    user: req.body.user,
    password: req.body.password,
    schema: req.body.schema,
  }
  res.render('success', schema_info);
});

router.post('/connect/success', async (req, res, err) => {

  var schema_info = {
    host: req.body.host,
    user: req.body.user,
    password: req.body.password,
    schema: req.body.schema,
    query: req.body.query,
  }
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
  
  var temp = await dbPool(`${schema_info.query}`);
  //console.log("ajax로 받은것", temp);
  res.json(temp);
});




module.exports = router;
