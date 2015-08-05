Router.configure({
	layoutTemplate:'layout'
});
Router.map(function(){
	this.route("inicio",{path:"/"});
	this.route("pacientes",	{path:"/pacientes"});
	this.route("estados", 	{path:"/estados"});
	this.route("ciudades", 	{path:"/ciudades"});
	this.route("formPaciente", 	{path:"/formPaciente"});
  this.route("verPaciente",{
	  path:"/paciente/:_id",
	  data:function(){
		  return Pacientes.findOne({_id : this.params._id});
	  }
  });
});