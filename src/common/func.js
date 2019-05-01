function getQuoteDate(quoteTime) {
    var dateStr = null;
    var timeStr = null;
    var argDate = null;
    var ret = {};

    if (!!(quoteTime)) {
        argDate = new Date(quoteTime.replace(/-/g, "/"));
        timeStr = argDate.toTimeString().substring(0, 5);
        dateStr = (argDate.getMonth() + 1) + "月" + argDate.getDate() + "日 ";
    }

    ret = {
        date: dateStr + timeStr,
        time: timeStr
    };

    return ret;
}

module.exports = {
    getQuoteDate: getQuoteDate
};