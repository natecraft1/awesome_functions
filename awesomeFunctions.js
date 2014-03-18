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

// Douglas Crockford Memoizer for factorial and fibonacci
function memoizer(memo, formula) {
	var recur = function(n) {
		var result = memo[n];
		if (typeof result !== "number") {
			result = formula(recur, n);
			memo[n] = result;
		}
		return result;
	}
	return recur;
}
var factorial = memoizer([1,1], function(recur, n) {
	return n * recur(n-1);
});
console.log(factorial(3));
// formula(recur, 3) = 3 * recur(2) = formula(recur, 2) = 2 * recur(1) = 1
var fibonacci = memoizer([0,1], function(recur, n) {
	return recur(n-1) + recur(n+2);
});
console.log(fibonacci(3));
// formula(recur, 3) = recur(2) = formula(recur, 2) = recur(1) = 1 + recur(0) = 0 + ( recur(1))