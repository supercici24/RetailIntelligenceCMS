import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUTC(utcString: string, format: string = DATE_TIME_FORMAT) {
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resultTime
}
