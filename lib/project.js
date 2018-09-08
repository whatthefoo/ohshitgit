const fs = require("fs");
const path = require("path");

module.exports = {
  currentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: filePath => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  gitExist: () => {
    try {
      return fs.statSync(".git").isDirectory();
    } catch (err) {
      return false;
    }
  }
};
