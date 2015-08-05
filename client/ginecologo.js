if (Meteor.isClient) {
	
	
	Template.registerHelper('formatDate', function(date) {
	  return moment(date).format('DD-MM-YYYY');
	});
	Meteor.subscribe("userData");
  Accounts.ui.config({
    requestPermissions: {},
    passwordSignupFields: 'USERNAME_ONLY',
    extraSignupFields: [{
        fieldName: 'nombre',
        fieldLabel: 'Nombre',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Escribe el nombre");
            return false;
          } else {
            return true;
          }
        }
    }, {
        fieldName: 'apellidos',
        fieldLabel: 'Apellidos',
        inputType: 'text',
        visible: true,
    }, {
        fieldName: 'genero',
        showFieldLabel: false,      // If true, fieldLabel will be shown before radio group
        fieldLabel: 'Género',
        inputType: 'radio',
        radioLayout: 'vertical',    // It can be 'inline' or 'vertical'
        data: [{                    // Array of radio options, all properties are required
            id: 1,                  // id suffix of the radio element
            label: 'Masculino',     // label for the radio element
            value: 'm'              // value of the radio element, this will be saved.
          }, {
            id: 2,
            label: 'Femenino',
            value: 'f',
        }],
        visible: true
    }, {
        fieldName: 'terms',
        fieldLabel: 'Acepto los términos y condiciones',
        inputType: 'checkbox',
        visible: true,
        saveToProfile: false,
        validate: function(value, errorFunction) {
            if (value) {
                return true;
            } else {
                errorFunction('Debes aceptar los términos y condiciones.');
                return false;
            }
        }
    }]
	});
}

if (Meteor.isServer) {
  Meteor.startup(function() {

    return Meteor.methods({

      removeAllPacientes: function() {

        return Pacientes.remove({});

      }

    });

  });
  
  Meteor.publish("userData", function () {
	  if (this.userId) {
	    return Meteor.users.find({_id: this.userId},
	                             {fields: {'other': 1, 'things': 1}});
	  } else {
	    this.ready();
	  }
	});
}



			