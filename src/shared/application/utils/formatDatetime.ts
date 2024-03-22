import { defaultTo } from 'lodash';
import moment from 'moment-timezone';
import { DATE_TIME_FORMATS, TIMEZONES } from '../constants/datetime.constants';
export const formatDatetime = (
  dateTime: string | Date | moment.Moment,
  dateFormat?: string,
  dateTimezone?: string,
): string => {
  const timezone = defaultTo(dateTimezone, TIMEZONES.AMERICA_SAO_PAULO);
  const format = defaultTo(dateFormat, DATE_TIME_FORMATS.DEFAULT);

  return moment(dateTime).tz(timezone).format(format);
};
