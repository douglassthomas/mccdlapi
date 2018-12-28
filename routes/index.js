var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'eu-cdbr-west-02.cleardb.net',
  username : 'b1e604ae01c0a1',
  password : '321fe8f8',
  database : 'heroku_e69fb38a0ccdf69'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', function (req, res) {
  connection.query('CREATE TABLE courses(id INT, main_course_name VARCHAR(255), course_name VARCHAR(255), link VARCHAR(255), description VARCHAR(255))', function (err, results) {
    if(err){
      console.log(err.message);
      return res.json({message: err.message});
    }
    else{
      let query = "INSERT INTO courses VALUES(?, ?, ?, ?, ?)";
      connection.query(query, [1, 'Algorithm and Programming', '[Algorithm Session 01] - IDE and I/O', 'https://www.youtube.com/embed/YvjMya_9RcA', 'Topics: - Typing code with syntax error - Compile, run, and debug program - Knowing data type and variable assignment - Creating a program using I/O syntax']);
      connection.query(query, [2, 'Algorithm and Programming', '[Algorithm Session 02] - Arithmatic Operation', 'https://www.youtube.com/embed/O_E_Jzje6IM', 'Topic - Creating a program using arithmatic operation']);
      connection.query(query, [3, 'Algorithm and Programming', '[Algorithm Session 03] - Repetition', 'https://www.youtube.com/embed/GJ9vQ-CMb9M', 'Topic: - Create a program using repetition structure control']);
      connection.query(query, [4, 'Algorithm and Programming', '[Algorithm Session 04] - Selection', 'https://www.youtube.com/embed/ETPxMBZCmng', 'Topic - Create a program using selection control']);
      connection.query(query, [5, 'Algorithm and Programming', '[Algorithm Session 05] - Array', 'https://www.youtube.com/embed/RJkY-5hJq3k', 'Topics: - Creating a modular program using array 1D - Creating a modular program using array 2D']);
    }
    return res.json({
      message: 'success nih'
    })
  });

})


module.exports = router;
