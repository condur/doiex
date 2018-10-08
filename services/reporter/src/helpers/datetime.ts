export let getUnixTime = (dateStr:Date) => {
    const dateTime = new Date(dateStr).getTime();
    return Math.floor(dateTime / 1000)
}
