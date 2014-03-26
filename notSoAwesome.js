// finding the peak of a 1D array with Divide and Conquer
function peak(a) {
  if (a.length > 1) {
    var half = ~~(a.length/2);
    if (a[half] < a[half-1]) {
      a.splice(half);
      return peak(a);
    } else if (a[half] < a[half+1]) {
        return peak(a.splice(half+1));
    } else { 
    	return a[half]
    }
  } else {
    return a[0]; 
  }
}