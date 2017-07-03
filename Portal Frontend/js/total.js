var app = angular.module('metadataapp', ['ngMaterial', 'ngMessages']);

app.controller('totalCtrl', function($scope,$http) {
	
	$scope.selectedList = [];

	$scope.availableItems = [];
	$scope.collectionName = "test_source";
	
	
	$scope.levels = [];
	$scope.levels.push({name: "All", value:"all",isAttempted: false});
	$scope.levels.push({name: "Item Level", value:"itemLevel", isAttempted:false});
	$scope.levels.push({name: "Metadata Level", value:"metadataLevel", isAttempted:false});
	$scope.levels.push({name: "Source Level", value:"sourceLevel", isAttempted:false});

	$scope.items = [];
	$scope.items.push({name: "All", value:"all", isAttempted: false});
	$scope.items.push({name: "Errors", value:"err", isAttempted: false});
	$scope.items.push({name: "Warnings", value:"warn", isAttempted: false});

	//Testing purpose
	$scope.user = {state: 'CA'}
	$scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      });
	
	// var url = "http://10.146.95.172:3000/api/report";
		var url = "localhost:3000/api/report";


	$scope.setLevel = function(level){
		$scope.selectedOptionlevel = level.value;
		if(level.isAttempted === false){
			level.isAttempted= true;
			for(var i=0;i<$scope.levels.length;i++){
				if(level.value != $scope.levels[i].value)
					$scope.levels[i].isAttempted= false;
			}
		} else {
			level.isAttempted= false;
		}
	};
	
	$scope.setItem = function(item){
		$scope.selectedOptionItem = item.value;
		if(item.isAttempted === false){
			item.isAttempted= true;
			for(var i=0;i<$scope.items.length;i++){
				if(item.value != $scope.items[i].value)
					$scope.items[i].isAttempted= false;
			}
		} else {
			item.isAttempted= false;
		}
	};
	
	$scope.submitList = function(){
			//$http.post(){}
			$scope.availableItems=[];
			var data = {
				"collectionName": $scope.collectionName,
				"level": $scope.selectedOptionlevel,
				"flag": $scope.selectedOptionItem
			};
			var responsePromise = $http.post(url,data);
			responsePromise.then(function(response) {
					$scope.leftListObtained = true;
                    var availabledata = response.data.item;	
					for(var i=0;i<availabledata.length;i++){
						$scope.availableItems.push({ value : availabledata[i].name, count : availabledata[i].count  });
					}
                });
				
	};
	
	$scope.generateCSV = function(){
		
	};


});
