var app = angular.module("togetherApp");

function frequencyControllerFn($scope,$http) {
	
	var vm = this;

	console.log("Frequency Home controller loaded");

	$http.get('/getPlayers').
	then(function(response){

		//console.log(response);

		vm.players = response.data;

		$http.get('/getWeeklyRunActivityCount').
		then(function(runactivityResponse){

				playerrunactivityPoints = runactivityResponse.data;

						angular.forEach(vm.players,function(player){

								

								player.runningActivityPointsArray = _.findWhere(playerrunactivityPoints,{"name":player.playerName});
								//console.log(player.runningActivityPointsArray);
								player.runningActivityCount =0;

								angular.forEach(player.runningActivityPointsArray.data,function(intensityObj){

										player.runningActivityCount += intensityObj.runningActivityCount;
										//console.log(player.runningActivityPointsArray.data.length);
										player.avgSprints=player.runningActivityCount/player.runningActivityPointsArray.data.length;

										player.avgSprints= Math.round(player.avgSprints*100)/100;  

										//console.log(player.playerName + player.runningActivityCount + "avg" + player.avgSprints);
								});

								

						})

		})


		$http.get('/getWeeklyWeightActivityCount').
		then(function(weightactivityResponse){

				//console.log(weightactivityResponse);
				playerweightactivityPoints = weightactivityResponse.data;

						angular.forEach(vm.players,function(player){

								

								player.weightActivityPointsArray = _.findWhere(playerweightactivityPoints,{"name":player.playerName});
								//console.log(player.weightActivityPointsArray);
								player.weightActivityCount =0;

								angular.forEach(player.weightActivityPointsArray.data,function(intensityObj){

										player.weightActivityCount += intensityObj.weightActivityCount;

										player.avgWeights=player.weightActivityCount/player.weightActivityPointsArray.data.length;

										player.avgWeights= Math.round(player.avgWeights*100)/100;  
										
										console.log(player.playerName + player.weightActivityCount + "avg" + player.avgWeights);
										//console.log(player.playerName + player.runningIntensityPoints);
								});

								

						})

		})





	})



}

app.controller("frequencyController",frequencyControllerFn);