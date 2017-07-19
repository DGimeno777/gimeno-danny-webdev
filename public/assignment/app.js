// Declaring this inside of an anonymous function so that no one can see it
// and it is being evoked by the () at the end of the declaration
// Term: IIFE (immediately invoked function expression)
(function() {
    app = angular.module("WebAppMaker",["ngRoute"]);
})();

