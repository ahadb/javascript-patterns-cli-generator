// this is not really a pattern but is the foundation of promises, async await and
// all the syntactic sugar

function performSomeOperation(w, x, cb) {
  var y = w * x;
  if (!cb) {
    return new Error('You need to attach a callback to this function...')
  }
  cb(y)
}

performSomeOperation(10, 100, function(result) {
  console.log("The result of the operation is " +  result)
});

// () => The result of the operation is 1000
