module.exports = function toArr(data, includeEmpty) {
  if (!data && !includeEmpty) return []
  if (Array.isArray(data)) return data
  else return [data]
}
