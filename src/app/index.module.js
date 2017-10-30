import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';

import BrowseController from './locations/browse/browse.controller';
import HelpController from './locations/help/help.controller';
import CallsController from './locations/calls/calls.controller';

angular.module('angularGulpIonicBoilerplate', ['ionic', 'ui.router'])
  .config(config)

  .config(routerConfig)

  .run(runBlock)

  .controller('BrowseController', BrowseController)
  .controller('HelpController', function($scope){

  $scope.msg = '';

 $scope.getLocation = function(){
   $scope.requestLocation = function(){
  
    $scope.options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };
    $scope.success = function(pos){
      $scope.lng = pos.coords.longitude;
      $scope.lat = pos.coords.latitude;
      console.log($scope.lng, $scope.lat);
      $scope.msg = 'Your current longitude: ' + $scope.lng + ' and latitude: ' + $scope.lat  + '<img src="https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=300x300&maptype=roadmap&markers=color:red%7Clabel:A%7C' + $scope.lat + ',' + $scope.lng+ '&sensor=false">';
      document.getElementById('location').innerHTML = $scope.msg;

    }
  
    navigator.geolocation.getCurrentPosition($scope.success, $scope.error, $scope.options); 
  
  
     $scope.error = function(err){
      $scope.msg = 'Error: ' + err + ' :(';
    }  
  } 
  if('geolocation' in navigator){
    $scope.requestLocation();
  } else {
    $scope.msg = "Your browser doesn't support geolocation";
  }

} 
  $scope.getLocation();
  })
  .controller('CallsController', function($scope, providerService, $state, $sce){
    $scope.test = function() {
      console.log('test');
    }

    $scope.calls = providerService.getCalls();

    $scope.formatTime = input => {
      const date = input.slice(0,10);
      const time = input.slice(11,19);
      return [date, time];
    }

    $scope.currCall = 'nothing changed';
    $scope.callIndex;
    $scope.openCall = (call, i) => {
      $scope.currCall = Object.assign({}, call);
      $scope.callIndex = i;

      providerService.setCurrCall(call);
      $scope.showCallData();
      console.log($scope.callIndex, $scope.currCall);
      $state.go('call', {title: call.id, data: call});
    }

    $scope.showCallData = () => $scope.call = providerService.getCurrCall();

    $scope.trustURL = url => $sce.trustAsHtml(url);





  })
  .service('providerService', function($http){
    this.apiCall = $http({
      method: 'GET',
      url: 'https://api.callrail.com/v2/agencies/309848693/calls.json',
      headers: {
        'Authorization': 'Token token="a2a52af1191552138afad36ea4494cfa"',
        'Content-Type': 'application/json'
      }
    });
    let calls ;

    this.requestCalls = () => {
      calls = this.apiCall.then( res => { 
        calls = res.data.calls;
        console.log(res.data.calls);
      });
    }

    let currCall;

    this.setCurrCall = call => currCall = call;

    this.getCurrCall = () => currCall;


    this.getCalls = function() {
      return calls;
    };
  });
