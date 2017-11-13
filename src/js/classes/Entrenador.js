function Entrenador(nombre, correo, contrasena) {

    //Temporal
    this.nombre = nombre;
    this.correo = correo;
    this.contrasena = contrasena;
    this.alumnos = [];

    this.crearRutina = function crearRutina(rutina, rutinas) {
        rutinas.push(rutina);
        var id = localStorage.getItem('studentId');
        database.child('alumnos/' + id + '/rutinas').set(rutinas);
    }

    this.modificarRutina = function modificarRutina(rutina, index, rutinas) {
        rutinas[index] = rutina;
        var id = localStorage.getItem('studentId');
        database.child('alumnos/' + id + '/rutinas').set(rutinas);
    }

    this.comentarEjercicio = function comentarEjercicio() {

    }

    this.responderSolicitud = function responderSolicitud(respuesta, alumno) {
        var id = localStorage.getItem('userId');
        if (respuesta) {
            this.alumnos.push(alumno);
            database.child('entrenadores/' + id + '/alumnos').set(this.alumnos);
            database.child('alumnos/' + alumno + '/entrenador').set(id);
        }
        var query = database.child('entrenadores/' + id + '/solicitudes');
        query.once("value").then(function (snapshot) {
            for (var i = 0; i < snapshot.val().length; i++) {
                if (snapshot.val()[i] == alumno) {
                    database.child('entrenadores/' + id + '/solicitudes/' + i).remove();
                    return;
                }
            }
        });
    }

}
