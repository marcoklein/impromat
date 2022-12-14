const fs = require("fs");

/**
 * Restart program if you change configs!
 */
module.exports = function (eleventyConfig) {
  // clear site on initial build
  if (fs.existsSync("_site")) {
    fs.rmdirSync("_site", { recursive: true });
  }
  console.log("Cleared _site folder");

  return {
    dir: {
      input: "src",
    },
    jsDataFileSuffix: ".data",
  };
};
