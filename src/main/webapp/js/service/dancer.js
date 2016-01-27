aShowQApp.factory('DancerService', ['$http', '$q', function($http, $q) {
	 return {
			/**
			 * get a list of dancers
			 */
			find: function(searchCriteria){
				console.log("get a list of dancers");
				if (searchCriteria) {
					var deferred = $q.defer();
					$http.post('/'+app_name+'/resources/dancer/find', searchCriteria)
						.success(function(data) {
							if(data){
								deferred.resolve(data);
								console.log("data arrived");
							} else {
								console.log("no data");
								deferred.resolve(null);
							}
						})
						.error(function(data, status){
							console.log("Error, status : " + status + " msg : " + data);
							deferred.resolve(null);
						});
					return deferred.promise;	
				} else {
					console.log("[DancerService][find] Error: searchCriteria is null or undefined");
				}
		 	}
	};
}]);