var path_name = location.pathname;
var app_name = (path_name) ? path_name.split('/')[1] : "";
var timeOutAlert = 1000;
var clause = {
	where: " WHERE ",
	and: " AND ",
	or: " OR "
};
aShowQApp.factory('Template', function() {
	function Template(){
		this.path = "/" + app_name + "/view/";
		this.containers = {};
		this.callbacks = {};
	}
	
	Template.prototype = {
		open: function(name, template){
			this.containers[name] = this.path + template + '.html';
			if(this.callbacks[name]){
				this.callbacks[name].forEach(function(cb){
					cb();
				});
			}
		},
		close: function(name){
			this.containers[name] = 'empty';
			if(this.callbacks[name]){
				this.callbacks[name].forEach(function(cb){
					cb();
				});
			}
		},
		watch: function(name, fn){
			if(typeof fn !== 'function'){
				throw TypeError('template.watch(string, function) called with wrong parameters');
			}
			if(!this.callbacks[name]){
				this.callbacks[name] = [];
			}
			this.callbacks[name].push(fn);
		}
	};
	return Template;
});
/**
 * Application definition
 */
var app = angular.module('NsiWebApp', ['ngGrid', 'ngAnimate', 'ngRoute']);

/**
 * Routes configuration
 */
app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/member', 
			{templateUrl: 'templates/member/member.html', controller: 'MemberCtrl'}
	)
	.when('/dasa', 
			{templateUrl: 'templates/da-sa/da-sa.html', controller: 'DaSaCtrl'}
	)
	.when('/da-group', 
			{templateUrl: 'templates/da-group/da-group.html', controller: 'DaGroupCtrl'}
	)
	.when('/ma-group', 
			{templateUrl: 'templates/ma-group/ma-group.html', controller: 'MaGroupCtrl'}
	)
	.when('/rule', 
			{templateUrl: 'templates/routing-rule/routing-rule.html', controller: 'RoutingRuleCtrl'}
	)
	.when('/da-association', 
			{templateUrl: 'templates/da-association/da-association.html', controller: 'DaAssociationCtrl'}
	)
	.when('/inbound', 
			{templateUrl: 'templates/inbound/inbound.html', controller: 'InboundCtrl'}
	)
	.when('/outbound',
			{templateUrl: 'templates/outbound/outbound.html', controller: 'OutboundCtrl'}					
	)							
	.when('/outbcan',
			{templateUrl: 'templates/outbcan/outbcan.html', controller: 'OutbcanCtrl'}					
	)
	.when('/settlerr', 							
			{templateUrl: 'templates/settlerror/settlerr.html', controller: 'SettlerrCtrl'}					
	)
//	.when('/offbalpos', 							
//			{templateUrl: 'templates/off-balanced-position/offbalpos.html', controller: 'OffBalancePositionCtrl'}					
//	)
	.when('/instrument',
			{templateUrl: 'templates/instrument/instrument.html', controller: 'InstrumentCtrl'}					
	)							
	.when('/position-balance',
			{templateUrl: 'templates/position-balance/position-balance.html', controller: 'PositionBalanceCtrl'}					
	)							
	.when('/book-entries',
			{templateUrl: 'templates/book-entries/book-entries.html', controller: 'BookEntriesCtrl'}					
	)
	.when('/err-info',
			{templateUrl: 'templates/err-info/err-info.html', controller: 'ErrInfoCtrl'}					
	)
	.when('/conversion-exchanges',
			{templateUrl: 'templates/convertor/convertor.html', controller: 'ConvertorCtrl'}
	)
	.when('/conversion-detail',
			{templateUrl: 'templates/convertor/conversion-detail.html', controller: 'ConvertorCtrl'}
	)
	.when('/conversion-errors',
			{templateUrl: 'templates/convertor/conversion-errors.html', controller: 'ConvertorCtrl'}
	)
	.when('/management',
			{templateUrl: 'templates/management/management.html', controller: 'ManagementCtrl'}					
	)	
	.when('/monitoring',
			{templateUrl: 'templates/monitoring/monitoring.html', controller: 'MonitoringCtrl'}					
	)
	.when('/coe',
			{templateUrl: 'templates/coe/coe.html', controller: 'CoeCtrl'}					
	)
	.when('/security-report', 							
			{templateUrl: 'templates/security-report/security-report.html', controller: 'SecurityReportCtrl'}					
	)
	.when('/security-balance', 							
			{templateUrl: 'templates/security-balance/security-balance.html', controller: 'SecurityBalanceCtrl'}					
	)
	.when('/milestone', 							
			{templateUrl: 'templates/milestone/milestone.html', controller: 'MilestoneCtrl'}					
	)
//	.when('/ngOutbound', 							
//			{templateUrl: 'templates/ng-outbound/ng-outbound.html', controller: 'NgOutboundCtrl'}					
//	)
	;
}]);

/**
 * gridOptions
 */
app.factory('TsiGrid', ['$http', '$q', function($http, $q) {
	function TsiGrid(options) {
		var that = this;
		this.settingSrvc = '/'+app_name+'/settings/';
		this.options = options;
		var sortMethode = this.options.sort ? this.options.sort + '(col, $event)' : 'sort(col, $event)';
		var toggleSelectItemMethode = this.options.toggleSelectItemMethode ? this.options.toggleSelectItemMethode + '(row)' : 'toggleSelectItem(row)';
		this.headerCellTemplate = '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ' +
				'ng-class="{ \'ngSorted\': !noSortVisible }"><div ng-click="'+ sortMethode +'" ng-class="\'colt\' + col.index" ' + 
				'class="ngHeaderText">{{col.displayName}}</div><div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>' + 
				'<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div><div class="ngSortPriority">{{col.sortPriority}}</div>' + 
				'<div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div>' + 
				'<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';
		if(this.options.showSelectionCheckbox){
			this.checkboxCellTemplate = '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox"' +
				' ng-checked="row.selected" ng-click="'+ toggleSelectItemMethode +'"/></div>';
		}
		this.options.colmsDef.forEach(function(col){
			if(col.type){
				switch(col.type){
					case "boolean":
						col.cellTemplate = "<div class=\"col1 colt1 text-center\" ng-class=\"col.colIndex()\">" +
						"<span ng-if=\"COL_FIELD === 1\" class=\"icon-check\"><\/span>" +
						"<span ng-if=\"COL_FIELD === 0\" class=\"icon-uncheck\"><\/span>" +
						"</div>";
					break;
					case "status":
						col.cellTemplate = "<div class=\"col1 colt1 text-center\" ng-class=\"col.colIndex()\">" +
						"<span ng-if=\"COL_FIELD === 5\" class=\"icon-inprogress\"></span>" +
						"<span ng-if=\"COL_FIELD === 4 || COL_FIELD === 14\" class=\"icon-enabled\"><\/span>" +
						"<span ng-if=\"COL_FIELD === 3 || COL_FIELD === 15\" class=\"icon-disabled\"></span>" +
						"<span ng-if=\"COL_FIELD === 2\" class=\"icon-failed\"><\/span>" +
						"<span ng-if=\"COL_FIELD === 1\" class=\"icon-validated\"></span>" +
						"</div>";
					break;
					case "button":
						if(col.onClick){
							col.cellTemplate = "<div class=\"ngCellText\" ng-class=\"col.colIndex()\">" +
							"<input type=\"button\" class=\"btn grid-input\" ng-click=\"" + col.onClick + 
							"(row.entity)\" value=\"{{COL_FIELD}}\"";
							if(col.disabled){
								col.cellTemplate += " ng-disabled=\"!row.entity." + col.disabled + "\"";
							}
							col.cellTemplate += " ng-show=\"{{(COL_FIELD != null)}}\"></div>";
						}
						break;
					case "link":
						if(col.onClick){
							col.cellTemplate = "<div class=\"ngCellText\" ng-class=\"col.colIndex()\">" +
							"<a ng-click=\"" + col.onClick + "(row.entity)\">{{COL_FIELD}}</a>" +
							"</div>";
						}
						break;
					case "tooltip":
						if(col.title){
							col.cellTemplate = "<div class=\"ngCellText\" ng-class=\"col.colIndex()\">" +
							"<span title=\"{{row.entity." + col.title + "}}\">{{COL_FIELD}}</span>" +
							"</div>";
						}
						break;
					case "signed": // if it begins with a minus sign, paint it red
						col.cellTemplate = "<div class=\"ngCellText\" ng-class=\"col.colIndex()\">" +
						"<span ng-class=\"COL_FIELD[0] === '-' ? 'neg-nbr' : 'pos-nbr'\">{{ COL_FIELD }}<\/span>" +
						"</div>" ;
						break;
					case "number":
						col.cellTemplate = "<div class=\"ngCellText\" ng-class=\"col.colIndex()\">" +
						"<span ng-if=\"!COL_FIELD.toString().startsWith('-')\" class=\"pos-nbr\">{{COL_FIELD}}<\/span>" +
						"<span ng-if=\"COL_FIELD.toString().startsWith('-')\"  class=\"neg-nbr\">{{COL_FIELD}}<\/span>" +
						"</div>" ;
						break;
					case "time":
					case "date":
						col.cellTemplate = "<div class=\"ngCellText\" ng-class=\"col.colIndex()\">" +
						"<span ng-cell-text class=\"pos-nbr\">{{COL_FIELD}}</span>" +
						"</div>" ;
						break;
					default:
						break;
				}
			}
			col.headerCellTemplate = that.headerCellTemplate;
		});
//		this.rowTemplate = '<div ng-style="{ \'cursor\': row.cursor }" ng-dblclick="openRecord(row.entity)"' +
//				'ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}">' +
//				'<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div>' +
//				'<div ng-cell></div></div>';
				
		this.pagingOptions = {
			pageSizes: [10, 20, 50],
			pageSize: 20,
			currentPage: 1
		};
		this.filterOptions = {
			filterText: "",
			useExternalFilter: true
		};
		this.gridOptions = {
			data: this.options.gridName + 'Data',
			multiSelect: this.options.multiSelect ? this.options.multiSelect : false,
			enablePaging: true,
			showFooter: this.options.showFooter ? this.options.showFooter : false,
			enableColumnResize: true,
			enableRowReordering: true,
			enableRowSelection: true,
			enableColumnReordering: true,
			showColumnMenu: false,
			useExternalSorting: true,
			totalServerItems: this.options.gridName + 'TotalServerItems',
			pagingOptions: this.pagingOptions,
			filterOptions: this.filterOptions,
			columnDefs: this.options.colmsDef,
//			rowTemplate: this.rowTemplate,
			headerCellTemplate: this.headerCellTemplate,
			showSelectionCheckbox: this.options.showSelectionCheckbox ? this.options.showSelectionCheckbox : false,
			checkboxCellTemplate: this.options.showSelectionCheckbox ? this.checkboxCellTemplate : undefined,
			selectWithCheckboxOnly: this.options.selectWithCheckboxOnly ? this.options.selectWithCheckboxOnly : false,		
			selectedItems: this.options.selectedItems ? this.options.selectedItems : []
		};
	}
	
	// Services
	TsiGrid.prototype = {
		filterColumns: function() {
			var filteredColumns = [];
			this.gridOptions.$gridScope.columns.forEach(function(column){
				filteredColumns.push({
					field: column.field,
					displayName: column.displayName,
					index: column.index,
					width: column.width,
					visible: column.visible
				});
			});
			return filteredColumns;
		},
		saveSettings: function(){
			var that = this;
			var deferred = $q.defer();
			$http.put(that.settingSrvc + that.options.userId + '/' + that.gridName, {columnDefs: that.filterColumns()})
			   .success(function(data, status){
				   deferred.resolve(status);
			   })
			   .error(function(data, status){
				   deferred.resolve(null);
				   console.log("Error, status : " + status + " msg : " + data);
			   });
			return deferred.promise;	
		},
		restoreSettings: function(){
			var that = this;
			var clmnsDefs;
			$http.get(that.settingSrvc + that.options.userId + '/' + that.gridName)
			   .success(function(data){
					if(data && data.columnDefs){
						that.gridOptions.$gridScope.columns.forEach(function(column){
							var current = data.columnDefs.filter(function(columnDef){
								return columnDef.field == column.field;
							});
							if(current && current.length > 0){
								column.index = current[0].index;
								column.width = current[0].width;
								column.visible = current[0].visible;
							}
							current = undefined;
						});
					}
			   })
			   .error(function(data, status){
				   console.log("Error, status : " + status + " msg : " + data);
			   });
		}
	};
	return TsiGrid;
}]);


$(document).ready(function () {
	document.onscroll = function () {
		var scrollTop = $(window).scrollTop();
		var offsetTop = $('.navbar').offset().top;
		if (scrollTop === offsetTop && offsetTop < 53) {
			$('.navbar').removeClass('fixed-top');
			$('.bg').removeClass('hide');
			$('.main').css('margin-top', '0px');
		} else if(scrollTop > 53){
			$('.navbar').addClass('fixed-top');
			$('.bg').addClass('hide');
			$('.main').css('margin-top', '115px');
		}
	};
});
