const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const syncFunction = (func) => (
  new Promise((resolve, reject) => typeof func === 'function'? resolve(func()): reject('Function is required!'))
);

export { sleep, arraysEqual, syncFunction };

