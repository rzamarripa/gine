if(Meteor.isClient){
	Template.listarPaciente.helpers({
		pacientes: function(){
			return Pacientes.find({medico:Meteor.userId()});
		}		
	});
	
/*
	Template.verPaciente.helpers({
		paciente: function(){			
			return Pacientes.find({_id:"Nywwij3DWzwNNzonK"});
		},
	});
*/

	Template.formPaciente.events({
		'submit .nuevoPaciente': function(event){

			var id = event.target.id.value;
			var nombre = event.target.nombre.value;
			var apellidos = event.target.apellidos.value;
			var esposo = event.target.esposo.value;
			var esposoOcupacion = event.target.esposoOcupacion.value;
			var fechaNac = event.target.fechaNac.value;
			var sexo = event.target.sexo.value;
			var edoCivil = event.target.edoCivil.value;
			var email = event.target.email.value;
			var direccion = event.target.direccion.value;
			var estado = event.target.estado.value;
			var ciudad = event.target.ciudad.value;
			var ocupacion = event.target.ocupacion.value;
			var observaciones = event.target.observaciones.value;
			
			if(id == ""){
				Pacientes.insert({
					nombre: nombre,
					apellidos: apellidos,
					esposo: esposo,
					esposoOcupacion: esposoOcupacion,
					fechaNac: new Date(fechaNac),
					sexo: sexo,
					edoCivil: edoCivil,
					email: email,
					direccion: direccion,
					estado: estado,
					ciudad: ciudad,
					ocupacion: ocupacion,
					observaciones: observaciones,
					medico: Meteor.userId(),
					creadoEn: new Date()
				});
			}else{
				Pacientes.update(id,{$set:{
					nombre: nombre,
					apellidos: apellidos,
					esposo: esposo,
					esposoOcupacion: esposoOcupacion,
					fechaNac: new Date(fechaNac),
					sexo: sexo,
					edoCivil: edoCivil,
					email: email,
					direccion: direccion,
					estado: estado,
					ciudad: ciudad,
					ocupacion: ocupacion,
					observaciones: observaciones,
					medico: Meteor.userId(),
					actualizadoEn: new Date()
				}});
			}

			event.target.nombre.value = "";
			event.target.apelldios.value = "";
			event.target.esposo.value = "";
			event.target.esposoOcupacion.value = "";
			event.target.fechaNac.value = "";
			event.target.sexo.value = "";
			event.target.edoCivil.value = "";
			event.target.email.value = "";
			event.target.direccion.value = "";
			event.target.estado.value = "";
			event.target.ciudad.value = "";
			event.target.ocupacion.value = "";
			event.target.observaciones.value = "";
			
			return false;
		}
	});
	
	Template.listarPaciente.events({
		"click .delete": function (event) {
			var estatus = $('.delete').attr('value');
      Pacientes.update(this._id,{$set:{estatus: ! estatus}
	    });
    },
    'click .update': function () {
	    var date_str=moment(this.fechaNac).format('YYYY-MM-DD');
	    $("#id").val(this._id);
	    $("#nombre").val(this.nombre);
	    $("#apellidos").val(this.apellidos);
	    $("#esposo").val(this.esposo);
	    $("#esposoOcupacion").val(this.esposoOcupacion);
	    $("#fechaNac").val(date_str);
	    if(this.sexo == "mujer" || this.sexo == "Mujer"){$("#mujer").prop('checked', true);}else{$("#hombre").prop('checked', true);}	    
	    $("#edoCivil").val(this.edoCivil);
	    $("#email").val(this.email);
	    $("#direccion").val(this.direccion);
	    $("#ocupacion").val(this.ocupacion);
	    $("#observaciones").val(this.observaciones);
	    
	    $('#myModal').modal('show');
    },
    'click .nuevoPaciente': function() {
	    $('#myModal').modal('show');
    }
	});	
}