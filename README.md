El c�digo sirve para eliminar los posts utilizando la [API V2 eliminar inmuebles](https://drive.google.com/open?id=0B-LidNqwJHSPUXBUaGJVYU9DVFU)

######Pasos
`npm install`
`npm start`

Se necesita tener una lista de Ids en formato csv separada por \n, en todo caso que sea diferente modificar el c�digo. El csv debe etar en el mismo path.
Tambi�n se puede modificar la url.

Logs.
Para ver los logs.
forever logs nombre del archivo server-compiled.js.
tail -f tail -f /root/.forever/(nombre del archivo del log).

Para parar el servicio.
forever stop nombre del archivo o forever stopall.
