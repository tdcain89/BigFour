angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.formData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('MaxCtrl', function($scope, $localStorage, $window) {
  $scope.maxes = [
    { title: 'OHP', id: 1, weight: $localStorage.get(1), description: 'Watch your head', icon: 'img/ohp.png' },
    { title: 'Bench Press', id: 2, weight: $localStorage.get(2), description: 'No chest bounce', icon: 'img/bench.png' },
    { title: 'Squat', id: 3, weight: $localStorage.get(3), description: 'Go Lower', icon: 'img/squat.png' },
    { title: 'Deadlift', id: 4, weight: $localStorage.get(4), description: 'Straight back', icon: 'img/deadlift.png' }
  ];

  $scope.doWeight = function(weight) {
    w = weight + (5 - (weight % 5));

    if(w < 45){
      w = 45;
    }

    return w;
  };

  $scope.completeWorkout = function(maxId) {
    $localStorage.set(maxId, parseInt($localStorage.get(maxId)) + 5);
    $window.location.reload(true);
  };

  $scope.failWorkout = function(maxId) {
    $localStorage.set(maxId, parseInt($localStorage.get(maxId)) - 5);
    $window.location.reload(true);
  };
})

.controller('SingleMaxCtrl', function($scope, $stateParams, $localStorage, $window, $location) {
  $scope.maxes = [
    { title: 'OHP', id: 1, weight: $localStorage.get(1), description: 'Watch your head', icon: 'img/ohp.png' },
    { title: 'Bench Press', id: 2, weight: $localStorage.get(2), description: 'No chest bounce', icon: 'img/bench.png' },
    { title: 'Squat', id: 3, weight: $localStorage.get(3), description: 'Go Lower', icon: 'img/squat.png' },
    { title: 'Deadlift', id: 4, weight: $localStorage.get(4), description: 'Straight back', icon: 'img/deadlift.png' }
  ];
  $scope.activeMax = $scope.maxes[$stateParams.maxId - 1];

  $scope.setMax = function() {
    $scope.activeMax = $scope.maxes[$stateParams.maxId - 1];

    if ($scope.weight) {
      $localStorage.set($scope.activeMax.id, $scope.weight);
      $window.location.reload(true);
      $location.path("#/app/workouts");
    }
  };
});
