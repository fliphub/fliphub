module.exports = function shake(query) { 
const required = {} 
  if (query === "canada") {
    required["canada"] = require("./test/fixtures/src/canada.js") 
    return required;
  }
  if (query === "canada,eh") {
    required["canada"] = require("./test/fixtures/src/canada.js") 
    required["eh"] = require("./test/fixtures/src/eh.js") 
    return required;
  }
  if (query === "eh,canada") {
    required["eh"] = require("./test/fixtures/src/canada.js") 
    required["canada"] = require("./test/fixtures/src/eh.js") 
    return required;
  }
  if (query === "eh") {
    required["eh"] = require("./test/fixtures/src/canada.js") 
    return required;
  }

  return required 
}