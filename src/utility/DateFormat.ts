export const changeFormatDate = (
  dateString: string,
  format: string
): string => {
  var date = new Date(dateString)
  format = format
    .replace(/YYYY/, `${date.getFullYear()}`)
    .replace(/MM/, `${date.getMonth() + 1}`)
    .replace(/DD/, `${date.getDate()}`)
  return format
}