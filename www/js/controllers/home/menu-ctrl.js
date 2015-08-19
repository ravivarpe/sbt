angular.module('starter.menu', ['ionic'])


.controller('side-menu-ctrl', function($scope,CalendarDetailsFact) {

	var date = new Date();

    CalendarDetailsFact.getCurrentDayObj($scope, date.getFullYear(), (date.getMonth() + 1));
	
});

