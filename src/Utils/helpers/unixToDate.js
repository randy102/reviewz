import moment from 'moment';

export default function unixToDate(epoch) {
  return moment.utc(epoch).format('DD/MM/YYYY');
}
