# Facultad-ArquitecturaWeb
## Alumno: Alejandro Semprini

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
		estado 		string 
* Delete
DELETE /auto/{patente}
	Parameters:
		patente		string	
* List (todos los autos en venta)
GET /auto

Usuarios
* Create
POST /usuario
	Parameters:
		user		string
		nombre		string
		apellido	string
		pass		string
* Read
GET /usuario/{user}
	Parameters:
		user		string
* Delete
DELETE /usuario/{user}
	Parameters:
		pass		string
* Update
PUT /usuario/{user}
	Parameters:
		user		string
		nombre		string
		apellido	string
		pass		string

Subasta
* Create
POST /subasta
	Parameters:
		patente		  string
		fecha_inicio  date
		fecha_fin	  date
		valor_inicial integer
* Update
PUT /subasta/{patente}
	Parameters:
		user		string
		oferta		integer
* List
GET /subasta/{marca}
	Parameters:
		marca		string
* Read
GET /subasta/{patente}
	Parameters:
		patente		integer