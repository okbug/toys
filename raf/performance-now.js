let getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

if (
  typeof performance !== "undefined" &&
  performance !== null &&
  performance.now
) {
  module.exports = function () {
    return performance.now();
  };
} else if (
  typeof process !== "undefined" &&
  process !== null &&
  process.hrtime
) {
  module.exports = () => {
    return (getNanoSeconds() - nodeLoadTime) / 1e6;
  };
  hrtime = process.hrtime;
  getNanoSeconds = () => {
    let hr = hrtime();
    return hr[0] * 1e9 + hr[1];
  };
  moduleLoadTime = getNanoSeconds();
  upTime = process.uptime() * 1e9;
  nodeLoadTime = moduleLoadTime - upTime;
} else if (Date.now) {
  module.exports = () => Date.now() - loadTime;
  loadTime = Date.now();
} else {
  module.exports = () => new Date().getTime() - loadTime;
  loadTime = new Date().getTime();
}

//# sourceMappingURL=performance-now.js.map
