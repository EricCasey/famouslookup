const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

var question = process.argv[2]

client.connect((err) => {
  console.log("Serching ...")
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name LIKE $1::text OR first_name LIKE $1::text", [`${question}`], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    } else {
      printEm(result);
    }
    client.end();
  });
});

function printEm(result) {
  console.log(`Found ${result.rowCount} person(s) by the name '${question}':`)
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
  for (var i = 0; i < result.rowCount; i++) {
    console.log(`- ${result.rows[i].id}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${birthdayMaker(result.rows[i].birthdate)}'`);
  }
}
