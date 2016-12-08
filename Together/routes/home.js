

var FitbitApiClient = require("../fitbitLib/fitbit-api-client"),
    client = new FitbitApiClient("227WYS", "49e37cc3990bac64980a90802e9c5cf0");

exports.authorize=function(request,response)
{
    var url=client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:3000/home');
// request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
    console.log(url);
    response.redirect(url);
}

exports.home=function (request, response) {
// exchange the authorization code we just received for an access token
    client.getAccessToken(request.query.code, 'http://localhost:3000/home').then(function (result)
    {
        request.session.access_token=result.access_token;
        // use the access token to fetch the user's profile information
        client.get("/profile.json", result.access_token).then(function (results) {

            console.log(results[0]);
            response.render('index', { title: 'Together after login',body:results[0] });
        });
    }).catch(function (error) {
        response.send(error);
    });
}

exports.friends=function(request,response)
{
    //console.log(request.session);

    client.get("/friends.json", request.session.access_token).then(function (results) {
            console.log(results[0].friends);
            response.send({result:results[0]});
    });

}


exports.friendsLeaderBoard= function (request, response)
{
       client.get("/friends/leaderboard.json", request.session.access_token).then(function (results)
        {
            console.log(results[0]);
            response.send({result:results[0]});
        });
}

exports.getWaterLog=function (request,response)
{
    var date=request.param("date");
    client.get("/foods/log/water/date/"+date+".json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });

}


exports.frequentActivity=function (request,response)
{
    client.get("/activities/frequent.json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });

}

exports.activity=function (request,response)
{
    var date=request.param("date");

    client.get("/activities/date/"+date+".json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });

}
exports.dailySteps=function (request,response)
{

    client.get("/activities/steps/date/today/1m.json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });

};
exports.getFoodLog=function (request,response)
{
    var date=request.param("date");
    client.get("/foods/log/date/"+date+".json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });

}

exports.heartrate=function (request,response)
{

    client.get("/activities/heart/date/today/1d.json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });

}
exports.intradayHeartRate=function (request,response)
{
    var date=request.param("date");
    var detailLevel=request.param("detailLevel");
    var start=request.param("start");
    var end=request.param("end");


    client.get("/activities/heart/date/"+date+"/1d/"+detailLevel+"/time/"+start+"/"+end+".json", request.session.access_token).then(function (results)
    {
        console.log(results[0]);
        response.send({result:results[0]});
    });




}

exports.getRunningIntensityData=function(request,response)
{
   var result=[];
   for(var i=1;i<=3;i++)
   {
       var player1="Player"+i;
       var player2="Player"+(11-i);
       var temp1=
           {
                "playerName":player1,
                "day1":7,
                "day2":8,
                "day3":5,
                "day4":9,
                "day5":3,
                "day6":6,
                "day7":1
           };
       var temp2=
           {
               "playerName":player2,
               "day1":4,
               "day2":7,
               "day3":6,
               "day4":2,
               "day5":4,
               "day6":3,
               "day7":4
           }
           result.push(temp1);
            result.push(temp2);


   }
   response.send({result:result}) ;
}

