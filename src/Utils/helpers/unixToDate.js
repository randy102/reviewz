import moment from 'moment';

export default function unixToDate(epoch = undefined) {
  let dateFormat = 'DD/MM/YYYY';

  return epoch === undefined
    ? dateFormat
    : moment.utc(epoch).format(dateFormat);
}
