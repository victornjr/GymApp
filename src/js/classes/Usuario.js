function Usuario(nombre, correo, contrasena) {
  this.nombre = nombre;
  this.correo = correo;
  this.contrasena = contrasena;

  this.modificarRutina = function (rutina) {

  };

  this.verRutina = function () {

    return rutina;
  };

  this.verCalendario = function () {

    return calendario;
  };

  this.crearRutina = function () {

    return rutina;
  };
}

function iniciarSesion(correo, contrasena) {
  $.getJSON("database/usuario.json", function (data) {
    for (var i = 0; i < data.length; i++) {
      if (correo === data[i].email && contrasena === data[i].password) {
        this.nombre = data[i].name;
        console.log(this.nombre,1);
        return this.nombre;
      }
    }
  });
  console.log(this.nombre,2);
  return this.nombre;
};
