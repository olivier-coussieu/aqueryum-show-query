'use strict';

aShowQApp.controller('DancerListCtrl', ['$scope', 'DancerService',  function ($scope, DancerService) {
	$scope.translatedRequest = undefined;
	
	// Search form
	$scope.searchForm = {
			garterColors	: 	[{name: "rose"}		, {name: "red"}			, {name: "white"}	, {name: "black"}, {name: "purple"}, {name: "turquoise"}],
			hairColors		: 	[{name: "blonde"}	, {name: "red"}			, {name: "brown"}	, {name: "black"}],
			specialSigns	: 	[{name: "freckles"}	, {name: "beauty_spot"}	, {name: "none"}	],
			signLocations	: 	[{name: "cheek"}	, {name: "nose"}		, {name: "censored"}]
	};
	
	// Search fields
	$scope.searchFields = {
			requete: 'deb',
		hairColor: undefined,
		garterColor: undefined,
		specialSign: undefined,
		signLocation: undefined
	};

	// Search criteria
	$scope.searchCriteria = {
		criteria:  [],
		orderings: []
	};
	
	$scope.alert = {
		success: undefined,
		info: undefined,
		warning: undefined,
		error: undefined
	};
	
//	$scope.template = new Template();
//	$scope.template.open('main'  , 'settlerror/list');
//	$scope.template.open('search', 'settlerror/search');

	/*********************************************************/
	/** 					Services						**/
	/*********************************************************/
	
	$scope.clear = function(){
		$scope.searchFields = {
				hairColor: undefined,
				garterColor: undefined,
				specialSign: undefined,
				signLocation: undefined
		};
		$scope.translatedRequest = undefined;
	};
	
	$scope.find = function(){
		/** 
		 * 
		 **/
		$scope.searchCriteria = {
			criteria:  [],
			orderings: []//{field: 'age', order: 'Ascending'}]
		};
		if ($scope.searchFields.hairColor ) {			/** Hair color */
			$scope.searchCriteria.criteria.push({ field: 'hair_color', op: 'eq', value: $scope.searchFields.hairColor });
		}
		if ($scope.searchFields.garterColor) {			/** Garter color */
			$scope.searchCriteria.criteria.push({ field: 'garter_color', op: 'eq', value: $scope.searchFields.garterColor});		
		}
		if ($scope.searchFields.specialSign ) {			/** Special sign */
			$scope.searchCriteria.criteria.push({ field: 'specialsign_type', op: 'eq', value: $scope.searchFields.specialSign });
		}
		if ($scope.searchFields.signLocation) {			/** Special sign location */
			$scope.searchCriteria.criteria.push({ field: 'specialsign_location', op: 'eq', value: $scope.searchFields.signLocation});		
		}

		DancerService.find($scope.searchCriteria).then(function(data){
			if(data){		
				$scope.translatedRequest = data;
			} else {
				$scope.translatedRequest = 'Something went wrong!';
			}
		});
	};
}]);
