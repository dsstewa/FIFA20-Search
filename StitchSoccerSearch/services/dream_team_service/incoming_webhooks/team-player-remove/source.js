exports = function(payload) {

  const queryValue = parseInt(payload.query.value);

  console.log(queryValue);
 

  let atlas = context.services.get("mongodb-atlas");
  
  let team = atlas.db("soccer").collection("dream_team");
    
   team.deleteOne({value:queryValue});
         
 
    
    return ({ok:true});
  
};