//const pg = require("pg");
const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  connection: {
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
}
});

var question = process.argv[2]

knex.select('*').from('famous_people').where('last_name', `${question}`).orWhere({first_name: `${question}`})
.asCallback(function(err, result) {
  if (err) return console.error(err);
  printEm(result);
})
.then(function () {
    return knex.destroy();
})



function printEm(result) {
  console.log(`Found ${result.length} person(s) by the name '${question}':`)
  var birthdayMaker = function(d) {
    date = new Date(d)
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    };
    return d = yyyy + '-' + dd + '-' + mm;
  }
  for (var i = 0; i < result.length; i++) {
    console.log(`- ${result[i].id}: ${result[i].first_name} ${result[i].last_name}, born '${birthdayMaker(result[i].birthdate)}'`);
  }
}
