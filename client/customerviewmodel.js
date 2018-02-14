function petViewModel() {
  var self = this;

  self.petsList = ko.observableArray();
  self.idPet = ko.observable();
  self.namePet = ko.observable('');
  self.breed = ko.observable('');
  self.specie = ko.observable('');

  self.getPets = function () {
    $.getJSON("http://localhost:3000/api/mascota", function(data) {
      var observableData = ko.mapping.fromJS(data);
      var array = observableData();
      self.petsList(array);
      console.log(self.petsList());
    })
  };

  self.postPets = function(){
    console.log("entro en la funcion");
    var data = {
      id : self.idPet,
      name : self.namePet,
      breed : self.breed,
      specie : self.specie
    };
    console.log(data);
    $.post("http://localhost:3000/api/mascota", data, function(returnedData) {
      // This callback is executed if the post was successful
    })
  }
}

$(document).ready(function () {
  ko.applyBindings(new petViewModel());
});
