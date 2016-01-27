app.directive('container', function($compile){
	return {
		restrict: 'E',
		scope: true,
		template: '<div ng-include="templatePath"></div>',
		link: function(scope, element, attributes){
			scope.template.watch(attributes.name, function(){
				scope.templatePath = scope.template.containers[attributes.name];
				if(scope.templatePath === 'empty'){
					scope.templatePath = undefined;
				}
			});

			if(attributes.name){
				scope.templatePath = scope.template.containers[attributes.name];
			}
		}
	};
});

app.directive('datePicker', ['$compile', 'Calendar', function($compile, Calendar){
	return {
		scope: {
			ngModel: '='
		},
		replace: true,
		restrict: 'E',
		template: '<input type="text" ng-pattern="/(^0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-]((19|20)[0-9][0-9])/i" maxlength="10" placeholder="dd-mm-yyyy">', //placeholder="Enter or select a date"
		link: function($scope, $element, $attributes){
			$($element).css("width", 90);
			Calendar.getDaysOff().then(function(calendar){
				var startDate = moment(calendar.first).format('DD-MM-YYYY');
				var endDate = moment(calendar.last).format('DD-MM-YYYY');
				var datesDisabled = [];
				calendar.dayofflist.forEach(function(day){ 
					day = moment(day).format('DD-MM-YYYY'); 
					if(day){
						datesDisabled.push(day);
					}
				});
				$($element).datepicker({
					format: "dd-mm-yyyy",
					weekStart: 1,
					startDate: startDate ? startDate : -Infinity,
					endDate: endDate ? endDate : Infinity,
					autoclose: true,
					datesDisabled: datesDisabled ? datesDisabled : []
				}).on('changeDate', function(e){
					$scope.ngModel = moment(e.date).format('DD-MM-YYYY');
					$scope.$apply('ngModel');
				});
				
				$element.on('focus', function(){
					$($element).datepicker('show');
				});
				
			});
		}
	};
}]);

app.directive('autoCompletion', function($compile){
	return {
		scope: {
			ngModel: '='
		},
		restrict: 'A',
		link: function($scope, $element, $attributes){
			var serviceUrl = '/'+app_name+'/'+$attributes.srvc+'/autocomplete';
			$($element).autocomplete(
				serviceUrl,
				{
					field: $attributes.field,
					minChars: 4,
					max: 9
				}
			).on('result', function(e){
				if($attributes.cb){
					$scope.$parent.autoCompletionCb($attributes.cb, e.target.value);
				} else {
					$scope.ngModel = e.target.value;
					$scope.$apply('ngModel');
				}
			});
		}
	};
});

app.directive('tooltip', function(){
	return {
		restrict: 'A',
		link: function($scope, $element, $attributes){
			$($element).tooltip({
				animation: true, 
				placement: $attributes.tooltip ? $attributes.tooltip : 'right', 
				selector: false, 
				template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', 
				trigger: 'hover focus', 
				title: '', 
				delay: 0, 
				html: false, 
				container: false
			});
		}
	};
});

app.directive('ngMaxlength', function(){
	return {
		restrict: 'A',
		link: function($scope, $element, $attributes){
			var width = parseInt($attributes.ngMaxlength);
			if (!isNaN(width)){
				var size = ($attributes.tsiType && $attributes.tsiType === "num") ? 9 : 13;
				$($element).css("width", parseInt($attributes.ngMaxlength) * size);
			}
		}
	};
});
