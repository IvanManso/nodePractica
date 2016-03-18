#DESCRIPCIÓN

*Desarrollo de una API mediante el uso de las tecnologías Node.js, express y Mongo.db.
*Nodepop es una plataforma de venta o búsqueda de artículos de segunda mano.

#INTRUCCIONES DE USO DE NODEPOP

##INSTALACIÓN

*Comenzaremos con `$npm install` para instalar todas las dependencias.

*Para iniciar Nodepop eliminando los datos que se encuentran en la DB y que aparezcan los datos por defecto ejecutar comando:
`$npm run install_db` (ya que en dicha variable tenemos introducido el script que queremos que se ejecute al iniciar la app).

##FUNCIONALIDADES

*Para poder visualizar los anuncios predefinidos debemos de estar registrados en la BD (además de esto encontrarnos en la url "localhost:3000/api/v1/anuncio", por ello debemos hacer login con un user y pass correctos:

	-Si introducimos el nombre y la contraseña incorrectos nos aparecerá que no se puede conectar y tendremos reiniciar el navegador.
	-Si lo que introducimos mal es sólo la clave, nos volverá a pedir el user y la pass.
	-Si los introducimos correctamente los aparecerán los anuncios cargados de la DB en formato .JSON.

*Si nos estamos registrados en la DB deberemos realizar una petición post con los parámetros "nombre", "email" y "clave" a través de la url "http://localhost:3000/routes/users":

	-Si los campos de "nombre", "email" y/o "clave" se han introducido vacíos nos dirá de que han de estar rellenos
	-Si los campos de "nombre" y/o "email" se encuentran repetidos nos dirá que se encuentran repetidos en la DB.
	-Si introducimos los campos correctos y "nombre" y/o "email" no se encuentran repetidos, se añadirá a nuestra DB.

*Para utilizar los filtros deberemos de introducir en la url "localhost:3000/api/v1/anuncio" seguida de "?" y el filtro que deseamos visualizar con su correspondiente asignación de valor. Los filtros disponibles con un ejemplo adherido serían los siguientes:

	-Por tag: Utilizaremos la siguiente estructura en la url (PE:"localhost:3000/api/v1/anuncio?tags=lifestyle"), esto nos devolverá todos los anuncios que posean el tag de lifestyle.

	-Por sort: Utilizaremos la siguiente estructura en la url (PE:"localhost:3000/api/v1/anuncio?sort=precio"), este filtro nos devolverá ordenados los anuncios en función del filtro que le hayamos asignado. En este caso utilizaría un orden ascendente de precios.

	-Por venta: Utilizaremos la siguiente estructura en la url (PE:"localhost:3000/api/v1/anuncio?venta=true"), a esta etiqueta la asignaremos "true" o "false", de esta forma nos aparecerán los auncios que esten en venta y sino los anuncios que únicamente se buscan.

	-Por nombre: Utilizaremos la siguiente estructura en la url (PE:"localhost:3000/api/v1/anuncio?nombre=ip"), este filtro nos dará como resultado todos los anuncios cuyos nombres contengas dichas letras.

	-Por precio: Utilizaremos la siguiente estructura en la url (PE:"localhost:3000/api/v1/anuncio?precio=50"), este filtro tiene 4 opciones disponibles:

		*Igualatorio (precio=50), nos mostrará los anuncios que tengan precio igual a 50.
		*Interválico (precio=10-50), nos mostrará los anuncios que tenga un precio entre 10 y 50 inclusives.
		*Menor que (precio=-50), nos mostrará los anuncios con un precio menor que 50 inclusive.
		*Mayor que (precio=50-), nos mostrará los anuncios con un precio mayor que 50 inclusive.

	-Por limit: Utilizaremos la siguiente estructura en la url (PE:"localhost:3000/api/v1/anuncio?limit=5"), establecerá cuantos anuncios serán mostrados en nuestra pantalla.

	-Por start: Utilizaremos la siguiente estructura en la url (PE:"localhost:3000/api/v1/anuncio?start=2"), nos mostrará los anuncios existente a partir del número de anuncio asignado.

###Estas serían las funciones principales de esta primera versión de nodepop.


