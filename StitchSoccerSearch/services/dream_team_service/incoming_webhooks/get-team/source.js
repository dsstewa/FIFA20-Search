exports = function(){
 
  
  const collection = context.services.get("mongodb-atlas").db("soccer").collection("dream_team");
  
  
  return collection.find({}).sort({value:1}).toArray();
  
};