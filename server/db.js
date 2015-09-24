"use strict";
var pg = require('pg');
var bodyParser = require('body-parser');
var config = require('./config.js');
var databaseURL = config.databaseURL;

module.exports = function(app){

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:false}));

  //========================================================//
  //   Routes homepage to user profile                      //
  //========================================================//
  app.get('/', function(req, res){
   res.redirect('/profile.html');
  });

  //========================================================//
  //   Database Queries                                     //
  //========================================================//
  // ALLOWS USER TO SIGNUP
  app.post('/api/signup', function(req, res){
    var user = req.body.username;
    var password = req.body.password;
    pg.connect(databaseURL, function(err, client, done){
      var query = client.query('INSERT INTO users(username, password) VALUES ($1, $2)', [user, password]);
      done();
      var rows = [];
      if(err){
        return console.error('error inserting user', err);
      }
      query.on('row', function(row) {
        rows.push(row);
        
      });
      query.on('end', function(result) {
        console.log('User has been added');
        client.end();
      });

    });
  }); 


  // USER CREATES A NEW HABIT and adds to the habits table and users_habits junction table
  // and the updates table
  app.post('/api/habits', function(req, res){
    var habit = req.body.habit;
    var category = req.body.category;


    // UNCOMMENT THE LINE BELOW AND ADD THE USER FROM YOUR TEST DATABASE HERE


    // var user = 'R Kelly'; 



    var user = 'Vy'; 

    pg.connect(databaseURL, function(err, client, done){
      var habitIDQuery = "(SELECT DISTINCT habits.habit_id FROM habits " + 

       "WHERE habits.habit = '" + habit + "')"; 

      var userIDQuery = "(SELECT DISTINCT users.user_id FROM users " + 
       "WHERE users.username = '" + user + "')"; 

      var habitsQuery = client.query("INSERT INTO habits(habit, category) VALUES ( '" + habit + "', '" + category + "'); " +
                                   "INSERT INTO users_habits (user_id, habit_id) VALUES (" + userIDQuery + ", " + habitIDQuery + "); " +
                                   "INSERT INTO updates (habit_id, update_time) " + 
                                   "VALUES (" + habitIDQuery + " , current_timestamp);");

      done();
      var rows = []; 
      if (err) {
        return console.error('error running query', err);
      }
      habitsQuery.on('row', function(row) {
        rows.push(row);
      });
      habitsQuery.on('end', function(result) {
        client.end();
        return res.json(rows);
      });
    });
  });

  // GET USER UPDATES TIMES AND FREQUENCY 
  app.get('/api/updateHabit', function(req, res){
    pg.connect(databaseURL, function(err, client, done){
      var query = client.query("SELECT habits.habit, count(updates.habit_id) " + 
       "FROM habits " + 
       "INNER JOIN updates " + 
       "ON habits.habit_id = updates.habit_id " +
       "INNER JOIN users_habits " +
       "On habits.habit_id = users_habits.habit_id " +
       "INNER JOIN users " + 
       "ON users_habits.user_id = users.user_id " +
       "WHERE users.username = 'Vy' " +
       "GROUP BY habits.habit ");
      var rows = [];
      if (err) {
        return console.error('error running query', err);
      }
      query.on('row', function(row) {
        rows.push(row);
      });
      query.on('end', function(result) {
        client.end();
        return res.json(rows);
      });
    });
  });

  // USER UPDATES HABITS
  app.post('/api/updateHabit', function(req, res){
    var habit = req.body.habit;
    pg.connect(databaseURL, function(err, client, done){
      var getIDQuery = "(SELECT DISTINCT habits.habit_id FROM habits " + 
       "WHERE habits.habit = '" + habit + "')";
    var query = client.query("INSERT INTO updates (habit_id) " +
     "VALUES (" + getIDQuery + ")");
    done();
    var rows = [];
    if (err) {
      return console.error('error running query', err);
    }
    query.on('row', function(row) {
     rows.push(row);
   });
    query.on('end', function(result) {
      client.end();
      return res.json(rows);
    });
  });
  });

  // var deleteHabit = function(req, res) {
    app.delete('/api/deleteHabit', function(req, res){  
      var habit = req.body.habit;
      pg.connect(databaseURL, function(err, client, done){
        var getIDQuery = "(SELECT DISTINCT habits.habit_id FROM habits " + 
         "WHERE habits.habit = '" + habit + "')";
        var query = client.query(" DELETE FROM updates WHERE habit_id = " + getIDQuery + "; " + 
        "DELETE FROM users_habits WHERE habit_id = " + getIDQuery + "; " +
        "DELETE FROM habits WHERE habit_id = " + getIDQuery + "; ");
        done();
        var rows = [];

        if(err){
          return console.error('error inserting user', err);
        }

        query.on('row', function(row) {
          rows.push(row);
        });
        query.on('end', function(result) {
          client.end();
          return res.json(rows);
        });

      });
    });


// DB request for name and location
  app.get('/api/nameAndLoc', function(req, res) {
    pg.connect(databaseURL, function (err, client, done){      
      var query = client.query("SELECT location,username FROM users WHERE user_id = 1;");
      var rows = []; 
      if (err) {
        return console.error('error running query', err);
      }
      query.on('row', function(row) {
        rows.push(row);
      });

      query.on('end', function(result) {
        client.end();
        return res.json(rows);
      });
    });
  });


  // SHOWS ACTIVITY FEED FROM OTHER USERS IN THE SAME CATEGORY
  app.get('/api/activityFeed', function (req, res){


    var user = 'Vy';


    pg.connect(databaseURL, function (err, client, done){

      var getCategories = "(SELECT DISTINCT habits.category "+
        "FROM habits "+
        "INNER JOIN users_habits "+
        "ON habits.habit_id = users_habits.habit_id "+
        "INNER JOIN users "+
        "ON users_habits.user_id = users.user_id where users.username = '"+ user + "')";

      var query = client.query("SELECT * FROM ( " +
        "SELECT DISTINCT users.username, habits.habit, habits.category, updates.update_time, habits.habit_id, updates.update_id, updates.kudos_count, " +
        "row_number() OVER (PARTITION BY users.username ORDER BY updates.update_time DESC) AS row " +
        "FROM habits " +
        "INNER JOIN users_habits " +
        "ON habits.habit_id = users_habits.habit_id " +
        "INNER JOIN users " +
        "ON users_habits.user_id = users.user_id " +
        "INNER JOIN updates " +
        "ON habits.habit_id = updates.habit_id " +
        "WHERE users.username <> '"+ user +"' " +
        "AND category IN (" + getCategories + ")" +
        ") AS query_with_rows " +
        "WHERE row <= 2;");


      done();
      var rows = []; 
      if (err) {
        return console.error('error running query', err);
      }
      query.on('row', function(row) {
        rows.push(row);
      });

      query.on('end', function(result) {
        client.end();
        return res.json(rows);
      });
    });
  });

  app.post('/api/giveKudos', function(req, res){
    var update_id = req.body.update_id;
    pg.connect(databaseURL, function(err, client, done){
      var query = client.query("UPDATE updates SET kudos_count = kudos_count + 1 WHERE update_id = 1;");
      done();
      var rows = [];
      if(err){
        return console.error('error incrementing', err);
      }
      query.on('row', function(row) {
        rows.push(row);
        
      });
      query.on('end', function(result) {
        console.log('Kudos has been given...thumb up');
        client.end();
      });

    });
  }); 

};
