const moment = require("moment-timezone")

const timezone = "Asia/Jakarta" // Your timezone
// Monday is the first day of the week
moment.updateLocale("en", { week: { dow: 1 } })
const startOfWeekUtc = moment().tz(timezone).startOf("week").utc().toDate()
const endOfWeekUtc = moment().tz(timezone).endOf("week").utc().toDate()
const startOfMonthUtc = moment().tz(timezone).startOf("month").utc().toDate()
const endOfMonthUtc = moment().tz(timezone).endOf("month").utc().toDate()
const startOfYearUtc = moment().tz(timezone).startOf("year").utc().toDate()
const endOfYearUtc = moment().tz(timezone).endOf("year").utc().toDate()

module.exports = {
    startOfWeekUtc,
    endOfWeekUtc,
    startOfMonthUtc,
    endOfMonthUtc,
    startOfYearUtc,
    endOfYearUtc,
}
