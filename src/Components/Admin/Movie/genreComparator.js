import removeAccent from 'Utils/removeAccent';

export default function genreComparator(filter, value, filterText) {
  let inputArray = filterText
    .split(',')
    .map(input => removeAccent(input.trim()))
    .filter(input => input.length > 0);
  let genreArray = value.map(genre => removeAccent(genre));

  switch (filter) {
    case 'contains':
    case 'notContains':
      genreArray = genreArray.filter(genre => {
        for (let input of inputArray) {
          if (genre.includes(input)) {
            return true;
          }
        }
        return false;
      });
      if (filter === 'contains') {
        return genreArray.length >= inputArray.length;
      }
      return genreArray.length === 0;
    default:
      console.warn('Invalid filter type:', filter);
      return false;
  }
}
