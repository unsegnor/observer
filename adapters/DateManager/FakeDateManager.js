module.exports = function () {
  let currentDate

  return Object.freeze({
    setCurrentDate,
    getCurrentDate,
    areEqual,
    isLower
  })

  async function setCurrentDate (date) {
    currentDate = date
  }

  async function getCurrentDate () {
    return currentDate
  }

  async function areEqual (date1, date2) {
    return date1 === date2 || date1.startsWith(date2) || date2.startsWith(date1)
  }

  async function isLower (date1, date2) {
    return !(await areEqual(date1, date2)) && (date1 < date2)
  }
}
