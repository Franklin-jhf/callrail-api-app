class BrowseController {
  constructor(providerService) {
    'ngInject';
    this.requestCalls = providerService.requestCalls;
  }

  getCalls() {
    this.requestCalls();
  }
}

BrowseController.$inject = [
  'providerService'
];

export default BrowseController;
