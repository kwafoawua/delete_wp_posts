const express = require('express');
const fs = require('fs');
const request = require('request-promise');
const app = express();

/*Variabls globales*/
let listaID;
const user_id = 48;
//http://35.190.157.14:80 maquina del cron, reemplazar para produccion
const url = 'https://clasificadosc3test.simtlix.com/wp-json/v2/delete_immovables_post';
const token = '367DC7EAA712BD91514ECA2D49A1A';
const external_uidunico = 'fa5d92be192445239e3abdf8c75c802a'; //34144


app.get('/', (req, res) => {res.send('Delete Posts Script!')});

app.listen(5000, () => {console.log('Example app listening on port 3000!')});


fs.readFile(`${__dirname}/listadeidcustomsAA3.csv`, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  listaID = data.split('\n');
  console.log('Lee la lista');
  eliminarPosts(listaID);
});

function borrarUno(id) {
  	const apidelete = `${url}?token=${token}&external_uidunico=${external_uidunico}&user_id=${user_id}&post_id=${id}`;

	return new Promise(function(resolve, reject) {
    request({uri: apidelete, method: 'DELETE', time: true}, (error, response, body) => {
      if (error) return reject(error);
      let elapsedTime = response.elapsedTime / 1000;
      resolve(body +' Segundos: '+elapsedTime);
    });
  });
}

async function eliminarPosts(listaID) {
  let count = 0;
	  for (let customID of listaID) {
	  	try {
	  		const listing = await borrarUno(customID);
	  		console.log('Eliminado Nro: '+ count+' '+listing);
        count++;
	  	}catch(error) {
	  		console.error(error);
	  	}
	  }

}