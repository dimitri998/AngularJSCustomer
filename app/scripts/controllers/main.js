'use strict';

/**
 * @ngdoc function
 * @name angular15ComponentsAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angular15ComponentsAppApp
 */
angular.module('angular15ComponentsAppApp')
  .filter('fillNumber', function () {
    return function(personne){
      if(personne.telephone === undefined || personne.telephone === ""){
        personne.telephone="No phone communicated";
      }
      return personne;
    }
  })
  .controller('MainCtrl', ['$scope', function ($scope) {

    $scope.limit = 4;

    $scope.personne = {
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      montantcredit: 0
    };

    $scope.personnes = [{
      nom: "Traus",
      prenom: "Eddy",
      email: "eddy.traus@email.com",
      telephone:"065456789",
      montantcredit: 1000
    }, {
      nom: "Brus",
      prenom: "Mike",
      email: "mike.brus@email.com",
      montantcredit: 1250
    },
      {
        nom: "Kilpi",
        prenom: "Julian",
        email: "julian.kilpi@email.com",
        montantcredit: 7000
      },
      {
        nom: "Just",
        prenom: "Killian",
        email: "killian.just@email.com",
        montantcredit: 3000
      }];

    $scope.addCustomer = function(){
      var copyPersonne={
        nom: $scope.personne.nom,
        prenom: $scope.personne.prenom,
        telephone: $scope.personne.telephone,
        email: $scope.personne.email,
        montantcredit: $scope.personne.montantcredit
      };

      $scope.personnes.push(copyPersonne);
      $scope.viderChamp();
    };

    $scope.viderChamp = function () {
      $scope.personne.nom = "";
      $scope.personne.prenom = "";
      $scope.personne.telephone = "";
      $scope.personne.email = "";
      $scope.personne.montantcredit = 0;
    };


    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]).directive('customForm', function () {
  return {
    restrict: 'E',
    templateUrl: '../../views/form.html'
  }
}).directive('tableau', function () {
  return {
    restrict: 'E',
    templateUrl: '../../views/tableau.html'
  }
}).directive('verifyNumber', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(value) {
        var patternTel = new RegExp("^[0-9]{10}$");
        if (patternTel.test(value) || value.length === 0) {
          mCtrl.$setValidity('telephone', true);
        } else {
          mCtrl.$setValidity('telephone', false);
        }
        return value;
      }
      mCtrl.$parsers.push(myValidation);
    }
  }
}).directive('limitMontant', ['$filter', function($filter){
  return{
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function limitValidation(value) {
        if ($filter('limitTo')(value,4) == value) {
          mCtrl.$setValidity('montantcredit', true);
        } else {
          mCtrl.$setValidity('montantcredit', false);
        }
        return $filter('limitTo')(value, scope.limit);
      }
      mCtrl.$parsers.push(limitValidation);
    }
  }
}]);
