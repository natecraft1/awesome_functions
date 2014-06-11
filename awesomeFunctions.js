// *=*=*=*=*=*=*=* remove duplicates from array *=*=*=*=*=*=*=*
uniqueArray = myArray.filter(function(elem, pos) {
    return myArray.indexOf(elem) == pos;
});
//  *=*=*=*=*=*=*=* I have an object *=*=*=*=*=*=*=*
// obj = { "13-17": { "total_fans": 5 }, 
//         "18-24": { "total_fans": 10 }, 
//         "25-34": { "total_fans": 15 } 
//       }
// and I want to return from obj the key of the object
// with the highest total_fans, so in this case it would be 25-34

_.max(_.keys(obj), function(key){ 
  return obj[key]["total_fans"]; 
});

//  *=*=*=*=*=*=*=* Douglas Crockford Memoizer for factorial and fibonacci *=*=*=*=*=*=*=*
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

// *=*=*=*=*=*=*=* Return all combinations of an array whose value is less than n *=*=*=*=*=*=*=*

function combinations(array, n) {
  var retArr = [], len = 1<<array.length;
  for(var i=0;i<len;++i) {
    var subArr = array.filter(function(v,k) { return i >> k & 1});
    if (subArr.reduce(function(a,b) { return a + b; }, 0) <= n) { retArr.push(subArr) } 
  }
  return retArr;
}
// console.log(combinations([1,2,4,5], 6));
// O(N*2^N) 
// for faster implementation look at the PowerSet Algorithm

function getCombinations(chars) {
  var result = [];
  var f = function(prefix, chars) {
    for (var i = 0; i < chars.length; i++) {
      result.push(prefix + chars[i]);
      f(prefix + chars[i], chars.slice(i + 1));
    }
  }
  f('', chars);
  return result;
}
// *=*=*=*=*=*=*=* Javascript Watcher *=*=*=*=*=*=*=*
// https://gist.github.com/eligrey/384583
if (!Object.prototype.watch) {
	Object.defineProperty(Object.prototype, "watch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop, handler) {
			var
			  oldval = this[prop]
			, newval = oldval
			, getter = function () {
				return newval;
			}
			, setter = function (val) {
				oldval = newval;
				return newval = handler.call(this, prop, oldval, val);
			}
			;
			
			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					  get: getter
					, set: setter
					, enumerable: true
					, configurable: true
				});
			}
		}
	});
}
 
// object.unwatch
if (!Object.prototype.unwatch) {
	Object.defineProperty(Object.prototype, "unwatch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop) {
			var val = this[prop];
			delete this[prop]; // remove accessors
			this[prop] = val;
		}
	});
}