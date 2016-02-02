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


