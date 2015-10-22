'use strict';

angular.module('quizApp.system')

.factory("SystemSvc", [
	'$cordovaMedia',
	function($cordovaMedia) {
	    var service = {};

	    service.playSound = function(src){
	    	if(window.Media){
	            var media = $cordovaMedia.newMedia(src);

	            if(ionic.Platform.isIOS()){
	                media.play({
	                    numberOfLoops: 1,
	                    playAudioWhenScreenIsLocked : false
	                });
	            } else {
	                media.play();
	            }
            } else {
            	var audio = new Audio(src);
            	audio.play();
            }
        }

	    return service;
	}
]);
