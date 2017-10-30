function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('browse', {
      url: '/browse',
      views: {
        browse: {
          templateUrl: 'app/locations/browse/browse.html',
          controller: 'BrowseController as browseCtrl'
        }
      }
    })
    .state('calls', {
      url: '/calls',
      cache: false,
      views: {
        browse: {
          templateUrl: 'app/locations/calls/calls.html',
          controller: 'CallsController as callCtrl'
        }
      }
    })
    .state('call', {
      url: "call/{title}",
      params: {
        data: null
      },
      cache: false,
      views: {
        browse: {
          templateUrl: "app/locations/calls/callinfo.html",
          controller: 'CallsController as callCtrl'
        }
      }
    })
    .state('help', {
      url: '/help',
      views: {
        help: {
          templateUrl: 'app/locations/help/help.html',
          controller: 'HelpController as helpCtrl'
        }
      }
    });

  // $urlRouterProvider.otherwise('/browse');
}

export default routerConfig;
