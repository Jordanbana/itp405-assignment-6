var express = require('express')
var app = express()
var mysql = require('mysql');


app.get('/dvds/:id', function (request, response) {

  var connection = mysql.createConnection({
    host       : 'itp460.usc.edu',
    user       : 'student',
    password   : 'ttrojan',
    database   : 'dvd'
  });

  var dvdID = request.params.id;
  connection.query('SELECT title, award, genres.genre_name, rating_id FROM dvds INNER JOIN genres ON dvds.genre_id = genres.id WHERE dvds.id = ?', [ dvdID ], function(error, dvds){
    if (error){
      throw error;
    }
    var dvd = dvds[0];

    response.json(dvd);
    connection.end();
  });

})

app.listen(3000)
