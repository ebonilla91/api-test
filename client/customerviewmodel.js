function petViewModel() {
  var self = this;

  self.petsList = ko.observableArray();
  self.idPet = ko.observable();
  self.namePet = ko.observable('');
  self.breed = ko.observable('');
  self.specie = ko.observable('');

  self.getPets = function () {
    self.idPet = ko.observable();
    self.namePet = ko.observable('');
    self.breed = ko.observable('');
    self.specie = ko.observable('');
    $.getJSON("http://localhost:3000/api/mascota", function(data) {
      var observableData = ko.mapping.fromJS(data);
      var array = observableData();
      self.petsList(array);
    })
  };

  self.postPets = function(){
    var data = {
      nombre : self.namePet,
      id : self.idPet,
      raza : self.breed,
      especie : self.specie
    };
    var jsonData = ko.toJS(data);
    console.log(jsonData);
    $.post("http://localhost:3000/api/mascota", jsonData, function(returnedData) {
      success: self.getPets()
    })
  }
}

$(document).ready(function () {
  ko.applyBindings(new petViewModel());
});
