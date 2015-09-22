module.exports = {


    /* Change the database name to your local machine's name*/

    databaseURL: process.env.DATABASE_URL || 'postgres://localhost:5432/glenngonda'


    // databaseURL: process.env.DATABASE_URL || 'postgres://localhost:5432/kmerino'

  // databaseURL: 'postgres://localhost:5432/kmerino'

    /* This is used for the PostGres DB server */
    /*
    In the terminal, first export the link to the PG DB: 
      export DATABASE_URL='postgres://qacakftnxcikfj:fppgETRZp0te0xzfcKgihjywYN@ec2-54-243-149-147.compute-1.amazonaws.com:5432/d4etla2a7iv9n3'
    Then run nodemon: 
      DATABASE_URL='postgres://qacakftnxcikfj:fppgETRZp0te0xzfcKgihjywYN@ec2-54-243-149-147.compute-1.amazonaws.com:5432/d4etla2a7iv9n3?ssl=true' nodemon app.js
    If the Heroku toolbelt and the PGAdmin are both installed, run the following to access the PG DB in the terminal: 
      heroku pg:psql --app habitudein30 HEROKU_POSTGRESQL_TEAL
    */
    // databaseURL: process.env.DATABASE_URL || 'postgres://qacakftnxcikfj:fppgETRZp0te0xzfcKgihjywYN@ec2-54-243-149-147.compute-1.amazonaws.com:5432/d4etla2a7iv9n3'
};