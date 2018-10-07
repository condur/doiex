export let convert = (dateStr:String) => {
  var parts = dateStr.split("-")
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
}
