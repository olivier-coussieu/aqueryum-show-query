app.factory('Calendar', ['$http', '$q', function($http, $q) {
	return {
		getDaysOff: function(){
			var deferred = $q.defer();
			$http.get('/'+app_name+'/calendar/daysoff')
			.success(function(data){
				if(data){
					deferred.resolve(data);
				} else {
					deferred.resolve(null);
				}
			})
			.error(function(data, status){
				console.log("[Calendar][getStartDate] Error Status : " + status);
			});
			return deferred.promise;
		},
		getPrevious: function(){
			var deferred = $q.defer();
			$http.get('/'+app_name+'/calendar/previous')
			.success(function(data){
				if(data){
					deferred.resolve(data);
				} else {
					deferred.resolve(null);
				}
			})
			.error(function(data, status){
				console.log("[Calendar][getPrevious] Error Status : " + status);
			});
			return deferred.promise;
		},
		getBDate: function(){
			var deferred = $q.defer();
			$http.get('/'+app_name+'/calendar/current')
			.success(function(data){
				if(data){
					deferred.resolve(data);
				} else {
					deferred.resolve(null);
				}
			})
			.error(function(data, status){
				console.log("[Calendar][getBDate] Error Status : " + status);
			});
			return deferred.promise;
		},
		getPreviousBDate: function(){
			var deferred = $q.defer();
			$http.get('/'+app_name+'/calendar/previous')
			.success(function(data){
				if(data){
					deferred.resolve(data);
				} else {
					deferred.resolve(null);
				}
			})
			.error(function(data, status){
				console.log("[Calendar][getPreviousBDate] Error Status : " + status);
			});
			return deferred.promise;
		}
	};
}]);

app.factory('Config', ['$http', '$q', function($http, $q) {
	return {
		getEnv: function(){
			var deferred = $q.defer();
			$http.get('/'+app_name+'/config/env')
			.success(function(data){
				if(data){
					deferred.resolve(data);
				} else {
					deferred.resolve(null);
				}
			})
			.error(function(data, status){
				console.log("[Config][getEnv] Error Status : " + status);
			});
			return deferred.promise;
		},
		getTag: function(){
			var deferred = $q.defer();
			$http.get('/'+app_name+'/config/tag')
			.success(function(data){
				if(data){
					deferred.resolve(data);
				} else {
					deferred.resolve(null);
				}
			})
			.error(function(data, status){
				console.log("[Config][getTag] Error Status : " + status);
			});
			return deferred.promise;
		}
	};
}]);