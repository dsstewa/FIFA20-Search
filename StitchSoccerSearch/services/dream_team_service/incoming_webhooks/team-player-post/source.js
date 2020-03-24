exports = function(payload) {
 
  const queryID = parseInt(payload.query.ID);
 
  const queryValue = parseInt(payload.query.value);
  console.log(queryID + " " + queryValue);

    let atlas = context.services.get("mongodb-atlas");
    let players = atlas.db("soccer").collection("players2020");
    let team = atlas.db("soccer").collection("dream_team");
    
    team.deleteOne({value:queryValue});
    
    players.findOne({'ID': queryID}).then(player => 
    { console.log(JSON.stringify(player));
     
      player.value = queryValue;
      team.insertOne(player);
         
      });
    
    return ({ok:true});
  
};