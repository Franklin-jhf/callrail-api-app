class CallsController {
  constructor(providerService, $http) {
    'ngInject';
    console.log('whatisgood');
    this.test1 = 'hi does this work';

    this.apiCall = $http({
      method: 'GET',
      url: 'https://api.callrail.com/v2/agencies/309848693/calls.json',
      headers: {
        'Authorization': 'Token token="a2a52af1191552138afad36ea4494cfa"',
        'Content-Type': 'application/json'
      }
    });

    console.log(this.apiCall);
  }


  test() {
    console.log(this.test1);
  }

}

CallsController.$inject = [
  '$http',
  'providerService'
];

export default CallsController;
