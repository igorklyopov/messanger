/*removes comma after tag in array of markup strings */
function formatMarkupString(markupArr = [], tagNameWithComma = '') {
  const tagWithComma = tagNameWithComma + '>\\s*,';

  const tagWithCommaRegExp = new RegExp(tagWithComma, 'g');

  const formattedMarkup = markupArr
    .join(',')
    .replace(tagWithCommaRegExp, `${tagNameWithComma}>`);

  return formattedMarkup;
}
