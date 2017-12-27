var db = require("../model/db");

var exports = module.exports = {};

// call back needs to be put into place and edit query for food
exports.query = function(sortinfo,longitude,latitude,loading,callback){
var sortlimit="";
var finalresults=[];

    var query1, query2;
    longitudehigh = longitude + .01;
    longitudelow = longitude - .01;
    latitudehigh = latitude + .02;
  latitudelow = latitude - .02;


    var query1 = ({$and:[{$or:[{cuisine:"Sandwiches/Salads/Mixed Buffet"},{cuisine:"Salads"},
    {cuisine:"Juice, Smoothies, Fruit Salads"},{cuisine:"Fruits/Vegetables"}],"address.coord.0":{$lt:longitudehigh,$gt:longitudelow},
    "address.coord.1":{$lt:latitudehigh,$gt:latitudelow}}]});

    var query2=({$and:[{$or:[{cuisine:{$ne:"Sandwiches/Salads/Mixed Buffet"}},{cuisine:{$ne:"Salads"}},
      {cuisine:{$ne:"Juice, Smoothies, Fruit Salads"}},{cuisine:{$ne:"Fruits/Vegetables"}}],"address.coord.0":{$lt:longitudehigh,$gt:longitudelow},
      "address.coord.1":{$lt:latitudehigh,$gt:latitudelow}}]});


    var projection = {_id:0,name:1,"address.building":1,"address.street":1};

    db.get().collection('restaurants').find(query1,projection)
    .sort({cuisine:1, name: 1})
     .limit(sortinfo.healthy).toArray(function (error,result){
      if(error){
        return console.log("failed to gather data" + " "+ error);}
        else if(result.length== 0){console.log("result is empty look at query and try again, or no results found")}
      else{

     if(finalresults.length == 2 )
      {
       return finalresults;
     }
     else{

      loading();
      callback(result);

     }

  }
      })

      db.get().collection('restaurants').find(query2,projection)
       .limit(sortinfo.nonhealthy).toArray(function (error,result){
        if(error){
          return console.log("failed to gather data" + " "+ error);}
          else if(result.length== 0){return console.log("result is empty look at query and try again, or no results found")}
        else{
          if(finalresults.length == 2 )
          {
           return finalresults;
         }
         else{


           callback(result);

         }

    }

  })


//db.restaurants.find({$and:[{$or:[{cuisine:{$ne:"Sandwiches/Salads/Mixed Buffet"}},{cuisine:{$ne:"Salads"}},{cuisine:{$ne:"Juice, Smoothies, Fruit Salads"}},{cuisine:{$ne:"Fruits/Vegetables"}}],"address.coord.0":{$lt:-73.900457,$gt:-73.820457},"address.coord.1":{$lt:40.6999857,$gt:40.6349857}}]});

//db.restaurants.find({$or:[{cuisine:"Sandwiches/Salads/Mixed Buffet"},{cuisine:"Salads"},{cuisine:"Juice, Smoothies, Fruit Salads"},{cuisine:"Fruits/Vegetables"},{"address.coord.0":{$lt:40.6399857,$gt:40.6349857}},{"address.coord.1":{$lt:-73.850457,$gt:-73.820457}}]});
//db.restaurants.find({"address.coord.0":{$gt:0,$lt:40.6349857}},{"address.coord.1":-73.820457});

      }
