'use strict';

var express = require('express');
var csv = require('csv');
var fs = require('fs');
var request = require('request-promise');
var app = express();

/*Variabls globales*/
var listaID = void 0;
var user_id = 48;
var post_id = void 0;
//http://35.190.157.14:80 mquina del cron, reemplazar para produccion
var url = 'https://clasificadosc3test.simtlix.com/wp-json/v2/delete_immovables_post';
var token = '367DC7EAA712BD91514ECA2D49A1A';
var external_uidunico = 'fa5d92be192445239e3abdf8c75c802a'; //34144


app.get('/', function (req, res) {
  res.send('Delete Posts Script!');
});

app.listen(5000, function () {
  console.log('Example app listening on port 3000!');
});

fs.readFile(__dirname + '/listadeidcustomsAA3.csv', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  listaID = data.split('\n');
  console.log('Lee la lista');
  eliminarPosts(listaID);
});

function borrarUno(id) {
  var apidelete = url + '?token=' + token + '&external_uidunico=' + external_uidunico + '&user_id=' + user_id + '&post_id=' + id;

  return new Promise(function (resolve, reject) {
    request({ uri: apidelete, method: 'DELETE', time: true }, function (error, response, body) {
      if (error) return reject(error);
      var elapsedTime = response.elapsedTime / 1000;
      resolve(body + ' Segundos: ' + elapsedTime);
    });
  });
}

async function eliminarPosts(listaID) {
  var count = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = listaID[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var customID = _step.value;

      try {
        var listing = await borrarUno(customID);
        console.log('Eliminado Nro: ' + count + ' ' + listing);
        count++;
      } catch (error) {
        console.error(error);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
