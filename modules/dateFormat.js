function StringToDate(e) {
  return new Date(e).toISOString().slice(0, 10)

}
export {
  StringToDate
}
