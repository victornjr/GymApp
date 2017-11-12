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
    if(rutina.dates.length > 0){
      this.agregarAFecha(this.rutinas[this.rutinas.length-1], this.rutinas.length-1);
    }
  }

  this.modificarRutina = function modificarRutina(rutina, index){
    
    this.rutinas[index] = rutina;
    var id = localStorage.getItem('userId');
    database.child('alumnos/' + id + '/rutinas').set(this.rutinas);
    if(rutina.dates.length > 0){
      this.agregarAFecha(this.rutinas[index],index);
    }
  }

  this.agregarAFecha = function agregarAFecha(rutina, index){
    if(!this.calendario){
      this.calendario = new Calendario();
    }
    for(var i=0; i<rutina.dates.length; i++){
      var fecha = rutina.dates[i];
      if(!this.calendario.dias[fecha]){
        this.calendario.dias[fecha] = {};
        this.calendario.dias[fecha][index] = false;
      } else{
        var found = this.calendario.dias[fecha][index];
        if(!found){
          this.calendario.dias[fecha][index] = false;
        }
      }
    }
    var id = localStorage.getItem('userId');
    //database.child('alumnos/' + id + '/rutinas/' + index + '/dates').set(rutina.dates);
    database.child('alumnos/' + id + '/calendario/días').set(this.calendario.dias);
  }

  this.terminarRutina = function terminarRutina(fecha, rutinaId, terminado){
    this.calendario.dias[fecha][rutinaId] = terminado;
    var id = localStorage.getItem('userId');
    database.child('alumnos/' + id + '/calendario/días/' + fecha + '/' + rutinaId).set(terminado);
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
