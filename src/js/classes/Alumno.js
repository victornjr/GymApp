function Alumno(nombre, correo, contrasena) {
  //Usuario(nombre, correo, contrasena);

  this.entrenador;
  this.calendario = new Calendario();
  this.rutinas = [];
  this.cuestionario;

  //rutinas();
  //Temporal
  this.nombre = nombre;
  this.correo = correo;
  this.contrasena = contrasena;

  //this.iniciarSesion = Usuario.iniciarSesion.call(correo, contrasena);
  //Usuario.modificarRutina.call();

  this.hacerCuestionario = function hacerCuestionario(cuestionario) {
    this.cuestionario = cuestionario;
    var id = localStorage.getItem('userId');
    database.child('alumnos/' + id + '/cuestionario').set({ respuestas: this.cuestionario.respuestas });
  }

  this.enviarSolicitudEntrenador = function enviarSolicitudEntrenador(entrenador) {
    var id = localStorage.getItem('userId');
    var query = database.child('entrenadores/' + entrenador);
    var solicitud = []
    query.once("value").then(function (snapshot) {
      if (snapshot.val().hasOwnProperty("solicitudes")) {
        solicitud = snapshot.val().solicitudes;
      }
      solicitud.push(id);
      database.child('entrenadores/' + entrenador + '/solicitudes').set(solicitud);
    });
  }

  this.crearRutina = function crearRutina(rutina) {
    if (!this.rutinas)
      this.rutinas = [];
    this.rutinas.push(rutina);
    var id = localStorage.getItem('userId');
    database.child('alumnos/' + id + '/rutinas').set(this.rutinas);
  }

  this.modificarRutina = function modificarRutina(rutina, index){
    this.rutinas[index] = rutina;
    var id = localStorage.getItem('userId');
    database.child('alumnos/' + id + '/rutinas').set(this.rutinas);
  }
}


    /*
        
        function writeNewPost(uid, username, picture, title, body) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}*/
