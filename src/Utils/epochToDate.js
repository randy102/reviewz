import moment from 'moment';

export default function epochToDate(epoch) {
  return moment.utc(epoch).format('DD/MM/YYYY');
}
