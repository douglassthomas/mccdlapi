var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'eu-cdbr-west-02.cleardb.net',
  user: 'b1e604ae01c0a1',
  password: '321fe8f8',
  database: 'heroku_e69fb38a0ccdf69'
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', function (req, res) {
  connection.query('DROP TABLE courses');
  connection.query('DROP TABLE usercourses');
  connection.query('CREATE TABLE usercourses (id INT AUTO_INCREMENT PRIMARY KEY, userid INT, courseid INT)', function (err, results) {
    if (err) {
      return res.json({
        message: err.message
      })
    }
    else {
      connection.query('INSERT INTO usercourses(userid, courseid) VALUES(1, 3)');
      console.log('success bikin usercourse')
    }
  });


  connection.query('CREATE TABLE courses(id INT, main_course_name VARCHAR(255), course_name VARCHAR(255), link VARCHAR(255), description VARCHAR(255))', function (err, results) {
    if (err) {
      console.log(err.message);
      return res.json({ message: err.message });
    }
    else {
      let query = "INSERT INTO courses VALUES(?, ?, ?, ?, ?)";
      connection.query(query, [1, 'Algorithm and Programming', '[Algorithm Session 01] - IDE and I/O', 'https://www.youtube.com/embed/YvjMya_9RcA', 'Topics: - Typing code with syntax error - Compile, run, and debug program - Knowing data type and variable assignment - Creating a program using I/O syntax'], function (err, r) {

      });
      connection.query(query, [2, 'Algorithm and Programming', '[Algorithm Session 02] - Arithmatic Operation', 'https://www.youtube.com/embed/O_E_Jzje6IM', 'Topic - Creating a program using arithmatic operation'], function (err, r) {

      });
      connection.query(query, [3, 'Algorithm and Programming', '[Algorithm Session 03] - Repetition', 'https://www.youtube.com/embed/GJ9vQ-CMb9M', 'Topic: - Create a program using repetition structure control'], function (err, r) {

      });
      connection.query(query, [4, 'Algorithm and Programming', '[Algorithm Session 04] - Selection', 'https://www.youtube.com/embed/ETPxMBZCmng', 'Topic - Create a program using selection control'], function (err, r) {

      });
      connection.query(query, [5, 'Algorithm and Programming', '[Algorithm Session 05] - Array', 'https://www.youtube.com/embed/RJkY-5hJq3k', 'Topics: - Creating a modular program using array 1D - Creating a modular program using array 2D'], function (err, r) {

      });

      console.log('success bikin courses');
    }
    return res.json({
      message: 'success'
    })
  });

})

router.get('/courses', function (req, res) {
  let query = 'SELECT id, main_course_name, course_name, description FROM courses'
  connection.query(query, function (err, results) {
    if (err) {
      return res.json({
        message: err.message
      })
    }
    else {
      return res.json(results);
    }
  });
})

router.post('/user_courses', function (req, res) {
  var userid = req.body.userid;

  connection.query('SELECT c.id, main_course_name, course_name, description FROM usercourses uc JOIN courses c ON uc.courseid=c.id WHERE userid=?', [userid], function (err, results) {
    if (err) {
      return res.json({
        message: err.message
      })
    }
    else {
      return res.json({
        user_id : userid,
        courses : results
      })
     
    }
  })
})

router.post('/detail_courses', function (req, res) {
  var courseid = req.body.courseid;
  let query = 'SELECT * FROM courses WHERE id=?'
  connection.query(query,[courseid], function (err, results) {
    if (err) {
      return res.json({
        message: err.message
      })
    }
    else {
      return res.json(results[0]);
    }
  });
})

router.post('/assign_course', function (req, res) {
  var userid = req.body.userid;
  var courseid = req.body.courseid;
  
  connection.query('INSERT INTO usercourses(userid, courseid) VALUES(?,?)', [userid, courseid], function (err, result) {
    if(err){
      return res.json({
        message: err.message
      })
    }
    else{
      return res.json({
        user_id : userid,
        course_id : courseid,
        status : 'success'
      })
    }
  })
})

module.exports = router;
