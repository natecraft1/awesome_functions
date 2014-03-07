// remove duplicates from array
uniqueArray = myArray.filter(function(elem, pos) {
    return myArray.indexOf(elem) == pos;
});

// I have an object
// obj = { "13-17": { "total_fans": 5 }, 
//         "18-24": { "total_fans": 10 }, 
//         "25-34": { "total_fans": 15 } 
//       }
// and I want to return from obj the key of the object
// with the highest total_fans, so in this case it would be 25-34

_.max(_.keys(obj), function(key){ 
  return obj[key]["total_fans"]; 
});