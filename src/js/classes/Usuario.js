function Usuario(nombre, correo, contrasena) {
  this.nombre = nombre;
  this.correo = correo;
  this.contrasena = contrasena;
  this.first;

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
  var userType = correo.split("")[0] === 'A' ? "alumnos" : "entrenadores";
  var query = database.child(userType);
  var valid;
  query.once("value").then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      if (childSnapshot.val().correo === correo && childSnapshot.val().contrasena === contrasena) {
        localStorage.setItem('user',childSnapshot.val());
        localStorage.setItem('userId', childSnapshot.key);
        return true;
      }
    });
    return valid;
  });
}


