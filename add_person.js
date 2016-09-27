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

var firstName = process.argv[2]
var lastName = process.argv[3]
var dob = process.argv[4]

knex('famous_people').insert({'first_name' : `${firstName}`, 'last_name' : `${lastName}`, 'birthdate' : `${dob}`})
.then(function () {
    return knex.destroy();
})
