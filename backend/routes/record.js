const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
// get all restaurants 
recordRoutes.route("/Restaurants").get(async function (req, response) {
    let db_connect = dbo.getDb();

    try {
      var records = await db_connect
        .collection("Restaurants")
        .find({})
        .toArray();
      response.json(records);
    } catch (e) {
      console.log("An error occurred pulling the records. " + e);
    }

  });

//register new restaurant
  recordRoutes.route("/Restaurants/register").post(async (req,res)=>{
    const db_connect = dbo.getDb();
    
    const restaurant = {
      name : req.query.name,
      location: req.query.location,
      photo : req.query.photo,
      rating : req.query.rating,
      cuisine: req.query.cuisine,
      price : req.query.price,
      description: req.query.description,
      opening : req.query.opening,
      closing : req.query.closing
    }

        const check = await db_connect.collection("Restaurants")
                      .findOne({name: restaurant.name});

        if(!check){
          db_connect.collection("Restaurants").insertOne(restaurant)
          .then((result) =>{
            console.log(result)
            res.json(result)})
          .catch(err=>console.error(err));
          }
        })
            
  
          
        

// This section will help you get a single record by id
recordRoutes.route("/Restaurants/:id").get(async (req, res) =>{
    let db_connect = dbo.getDb();
    let myquery = { _id: new ObjectId(req.params.id) };
    const data = await db_connect
      .collection("Restaurants")
      .findOne(myquery);
      

    if(data){
      console.log(data);
      console.log(myquery._id)
      res.json(data)
    }else{
      console.log("data is not found")
    }
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   position: req.body.position,
   level: req.body.level,
 };
 db_connect.collection("records").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});

// This section will help you update a record by id.
recordRoutes.route("/Restaurants/:id/update").post(async (req, response) =>{
  
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  
  let update = {};
  let query = ['name', 'location', 'photo', 'rating', 'cuisine', 'description', 'closing', 'opening', 'phone']

  for(let check of query){
    if(req.query[check]!= null && req.query[check]!= undefined){
        update[check]=req.query[check];
    }
  }
  
  let newvalues = {
    $set: update
  };
    const result = await db_connect
    .collection("Restaurants")
    .findOneAndUpdate(myquery, newvalues,{returnDocument: 'after'})
    .then((res)=>
    {console.log(res);
      response.json(res)
    }).catch((err)=>{
      console.log(err);
      response.json(err);
    })

});
 


// This section will help you delete a record
recordRoutes.route("/Restaurants/:id/delete").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: new ObjectId(req.params.id) };
 db_connect.collection("Restaurants").findOneAndDelete(myquery, function (err, res) {
   if(err){
    console.log(err)
   }
    else if(res.ok && res.value){
    console.log("Deleted Record : ", res);
    response.json("Deleted Record : ", res);
   }
   else{
    console.log(`Data is not found`)
   }
 });
});




module.exports = recordRoutes;