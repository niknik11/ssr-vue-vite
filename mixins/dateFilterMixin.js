import DateTime from 'luxon/src/datetime';
const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';
export default {
  filters: {
    readableDate(date, noYear = true, parseFormat = false) {
      if (!date) {
        return '';
      } else if (parseFormat === true) {
        return DateTime.fromFormat(date, DATE_FORMAT).toFormat(
          `dd LLL ${noYear ? '' : 'y'}`
        );
      } else if (parseFormat) {
        return DateTime.fromFormat(date, parseFormat).toFormat(
          `dd LLL ${noYear ? '' : 'y'}`
        );
      } else {
        return DateTime.fromISO(date).toFormat(`dd LLL ${noYear ? '' : 'y'}`);
      }
    },
    readableTime(date, parseFormat = false) {
      if (!date) {
        return '';
      } else if (parseFormat === true) {
        return DateTime.fromFormat(date, DATE_FORMAT).toFormat(
          `HH:mm a`
        );
      } else if (parseFormat) {
        return DateTime.fromFormat(date, parseFormat).toFormat(`HH:mm a`);
      } else {
        return DateTime.fromISO(date).toFormat(`HH:mm a`);
      }
    },
  },
};
