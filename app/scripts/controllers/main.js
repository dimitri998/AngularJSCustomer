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
  .controller('MainCtrl', ['$scope', '$http', '$uibModal', function ($scope, $http, $uibModal) {

    $scope.limit = 4;
    $scope.personnes = [];
    $scope.montants = [1000,2000,3000];

    /**
     * Loaded from getCustomers (json)
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
     */

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

    $scope.postCustomers = function(){
      $http({
        method: "POST",
        url:"",
        data:""
      }).then(function successCallback(response){
      },function errorCallback(error){
        if(error.status == 404){
          $scope.openModal();
        }
      });
    };

    $scope.openModal = function(){
      $uibModal.open({
        templateUrl: '../../404.html'
      });
    };

    $scope.getCustomers = function(){
      $http({
        method: "GET",
        url: "../../customers.json"
      }).then(function successCallback(response){
        $scope.personnes = $scope.personnes.concat(response.data.personnes);
        alert("Clients ajoutés à la liste !");
      },function errorCallback(error){
        if(error.status == 404){
          $scope.openModal();
        }
      });
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
