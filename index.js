require.config({
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'angular': 'bower_components/angular/angular.min',
        'uiRouter': 'bower_components/angular-ui-router/release/angular-ui-router.min',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min'
    },

    shim: {
        angular: { deps: ['jquery'], exports: 'angular' },
        uiRouter: { deps: ['angular'] }
    }
});


require([
   'app/app',
   'app/controller/user_controller',

], function(app) {
    app.init();
});