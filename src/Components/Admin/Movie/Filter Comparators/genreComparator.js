import removeAccent from 'Utils/helpers/removeAccent';

export default function genreComparator(filter, value, filterText) {
  // Trim spaces and remove accents from input
  const input = removeAccent(filterText.trim());

  switch (filter) {
    case 'contains':
    case 'notContains':
      // Check if the value array has at least 1 element that contains input
      const contains = value.some(({ name }) =>
        removeAccent(name).includes(input)
      );
      return filter === 'contains' ? contains : !contains;

    case 'equals':
    case 'notEquals':
      // Check if the value array has at least 1 element that is equal to input
      const equals = value.some(({ name }) => removeAccent(name) === input);
      return filter === 'equals' ? equals : !equals;

    case 'startsWith':
      // Check if the value array has at least 1 element that starts with input
      return value.some(({ name }) => removeAccent(name).startsWith(input));

    case 'endsWith':
      // Check if the value array has at least 1 element that ends with input
      return value.some(({ name }) => removeAccent(name).endsWith(input));

    default:
      console.warn('Invalid filter type:', filter);
      return false;
  }
}
