# Facultad-ArquitecturaWeb
# Alumno: Alejandro Semprini

Compra-Venta de Autos

Grupos dentro de la API

Auto:
* Create
POST /auto
	Parameters:
		pantente	string
		modelo 		string
		marca 		string
		anio		integer
		color 		string
* Image
POST /auto/{patente}/image
	Parameters:
		patente		string
		image		file
* Read
GET /auto
	Parameters:
		patente		string
* Update
PUT /auto/{patente}
	Parameters:
		pantente	string
		modelo 		string
		marca 		string
		anio		integer
		color 		string
* Delete
DELETE /auto/{patente}
	Parameters:
		patente		string	
* List (en venta, vendidos)
GET /auto
	Parameters:
		patente		[string]

Usuarios
* Create
POST /user
	Parameters:
		user		string
		nombre		string
		apellido	string
		edad 		integer
		pass		string
* Read
GET /user/{user}
	Parameters:
		user		string
* Delete
DELETE /user/{user}
	Parameters:
		pass		string
* Update
PUT /user/{user}
	Parameters:
		user		string
		nombre		string
		apellido	string
		edad 		integer
		pass		string

Subasta
* Create
POST /subasta
	Parameters:
		patente		string
		fecha		date
		valor		integer
* Update
PUT /subasta/{id}
	Parameters:
		user		string
		oferta		integer
* List
GET /subasta/{marca}
	Parameters:
		marca		string
* Read
GET /subasta/{id}
	Parameters:
		id			integer