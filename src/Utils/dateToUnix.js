import moment from 'moment';

export default function dateToUnix(date) {
  return moment.utc(date, 'DD/MM/YYYY').valueOf();
}
