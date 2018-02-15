function petViewModel() {
  var self = this;

  self.petsList = ko.observableArray();
  self.idPet = ko.observable();
  self.namePet = ko.observable('');
  self.breedPet = ko.observable('');
  self.speciePet = ko.observable('');

  self.getPets = function () {

    $.getJSON("http://localhost:3000/api/mascota", function(data) {
      var observableData = ko.mapping.fromJS(data);
      var array = observableData();
      self.petsList(array);
    })
  };

  self.savePets = function(){
    var data = {
      nombre : self.namePet,
      id : self.idPet,
      raza : self.breedPet,
      especie : self.speciePet
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
