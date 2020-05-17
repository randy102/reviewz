import removeAccent from 'Utils/helpers/removeAccent';

export default function movieNameComparator(filter, value, filterText) {
  let filterInput = removeAccent(filterText);
  const nameEn = removeAccent(value.nameEn);
  const nameVn = removeAccent(value.nameVn);

  switch (filter) {
    case 'contains':
      return nameEn.includes(filterInput) || nameVn.includes(filterInput);
    case 'notContains':
      return !nameEn.includes(filterInput) && !nameVn.includes(filterInput);
    case 'equals':
      return nameEn === filterInput || nameVn === filterInput;
    case 'notEqual':
      return nameEn !== filterInput && nameVn !== filterInput;
    case 'startsWith':
      return nameEn.startsWith(filterInput) || nameVn.startsWith(filterInput);
    case 'endsWith':
      return nameEn.endsWith(filterInput) || nameVn.endsWith(filterInput);
    default:
      console.warn('Invalid filter type:', filter);
      return false;
  }
}
