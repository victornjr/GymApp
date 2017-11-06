function Alumno(nombre, correo, contrasena, entrenador, calendario, rutina, cuestionario){
  Usuario.call(this, nombre, correo, contrasena);

  this.entrenador = entrenador;
  this.calendario = calendario;
  this.rutina = rutina;
  this.cuestionario = cuestionario;

  this.iniciarSesion = Usuario.iniciarSesion.call(correo, contrasena);
  Usuario.modificarRutina.call();
}
