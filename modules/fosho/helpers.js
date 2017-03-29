const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1)
const lcFirst = (string) => string.charAt(0).toLowerCase() + string.slice(1)

module.exports = {
  ucFirst, lcFirst,
}
