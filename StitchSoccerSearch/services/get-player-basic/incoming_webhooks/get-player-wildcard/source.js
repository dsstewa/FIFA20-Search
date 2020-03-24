exports = function(payload){
  
  // THIS FUNCTION IS WILDCARD
  
  let arg = payload.query.arg;
  let natin = payload.query.natin;
  let natex = payload.query.natex;
  let foot = payload.query.foot;
  let club = payload.query.club;
  let pos = payload.query.pos;
  let highEnd = parseInt(payload.query.highEnd);
  let lowEnd = parseInt(payload.query.lowEnd);

  
  const collection = context.services.get("mongodb-atlas").db("soccer").collection("players2020");
  
  let calledAggregation = [
    {
      $searchBeta: {
        compound: {
          must:[]
        }
      }   // end of searchbeta
    }, 
    {
          $project: {
              Name:1,
              Last:1,
              ID:1,
              Country:1,
              Position:1,
              Overall:1,
              Photo:1,
              Skill:1,
              Club:1,
              Foot:1,
              Finishing:1,
              Dribbling:1,
              Strength:1,
              Speed:1,
              Passing:1,
              Defending:1
              }}, 
        {
          $limit: 12
        }
      ];
    
  if (arg !==''){
    let initStage ={
            term: {
              query: arg,
              path: 'Last',
              wildcard: true
        }};
    calledAggregation[0].$searchBeta.compound.must.push(initStage);
    console.log("ARG: " + arg);
    } else { console.log("EMPTY ARG: ");}

  
  if (foot){
      console.log("FOOT: " + foot);
      let footStage = {
          "search": {
              "query": foot,
              "path": "Foot"
          }};
      calledAggregation[0].$searchBeta.compound.must.push(footStage);
    }   
    
    if (club){
      console.log("CLUB: " + club);
      let clubStage = {
          "search": {
              "query": club,
              "path": "Club"
          }};
      calledAggregation[0].$searchBeta.compound.must.push(clubStage);
    }   
    
    if (pos){
      console.log("POSITION: " + pos);
      let posStage = {
          "search": {
              "query": pos,
              "path": "Position"
          }};
      calledAggregation[0].$searchBeta.compound.must.push(posStage);
    }   
  
  if (natin){
    console.log("NATIN: " + natin);
    let natinStage = {
        "search": {
            "query": natin,
            "path": "Country"
        }};
    calledAggregation[0].$searchBeta.compound.must.push(natinStage);
  }  else if (natex){
    console.log("NATEX: " + natex);
    let natexStage = {
          "search": {
            "query": natex,
            "path": "Country"
          }
        };
   
    calledAggregation[0].$searchBeta.compound.mustNot=natexStage;
  }
  
  if (lowEnd){
    console.log("LOW: " + lowEnd);
    if (!highEnd)   highEnd = 100;
    console.log("HIGHEND: " + highEnd);
      
    let overAllStage = {
        "range": {
          "path": "Overall",  
          "gte": lowEnd,
          "lte": highEnd
          }};
       calledAggregation[0].$searchBeta.compound.must.push(overAllStage);
    }
    
     console.log(JSON.stringify(calledAggregation));
  
  return collection.aggregate(calledAggregation).toArray();
};



 