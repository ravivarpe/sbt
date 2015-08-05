angular.module('starter.home')

//defining service
.service('myService', function() {
    this.name = '';
    this.setName = function(newName) {
        this.name = newName;
        return this.name;
    };
})

.service('calendarServices', function() {
    // this.daysInMonth = '';
    this.numberOfDaysInMonth;
    this.currentDayNumber;
    this.firstDayNumberOfMonth;


    this.daysInMonth = function(yearInNumber, monthInNumber) {
    	this.numberOfDaysInMonth = new Date(yearInNumber, monthInNumber, 0).getDate();
    	this.currentDayNumber = 1;
        return new Date(yearInNumber, monthInNumber, 0).getDate();
    };


});
