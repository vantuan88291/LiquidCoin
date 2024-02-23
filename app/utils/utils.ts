const formatIcon = {
  digitGroupingSeparator: ',',
  decimalSeparator: '.',
};
function trimTraillingZeros(
  str: string,
  decimalSeparator = '.',
): string {
  if (str && str.indexOf(decimalSeparator) >= 0) {
    let countZero = 0;
    for (let i = str.length - 1; i >= 0; i--) {
      if (str.charAt(i) === '0') {
        countZero++;
      } else {
        break;
      }
    }
    if (str.charAt(str.length - countZero - 1) === decimalSeparator) {
      countZero++;
    }
    return str.substring(0, str.length - countZero);
  }
  return str;
}
export function trimZero(str: string | number): string {
  if (typeof str === 'string') {
    const { decimalSeparator } = formatIcon;
    // return str.replace(
    //   new RegExp(`(${decimalSeparator}[0-9]*[1-9])0+$|.0*$`),
    //   '$1',
    // );
    return trimTraillingZeros(str, decimalSeparator);
  }
  return str.toString();
}
function truncate(num: number | string, trun: number): number | string {
  if (!num) {
    return 0;
  }
  let res = num;
  if (typeof num === 'number') {
    if (num.toString().indexOf('e') >= 0) {
      num = num.toFixed(10);
    } else {
      num = num.toString();
    }
  }
  if (num.indexOf('.') < 0) {
    res = parseFloat(num).toFixed(trun);
    return Number(res);
  }
  if (num.split('.')[1].length >= trun) {
    const pre = num.split('.')[0];
    const post = num.split('.')[1].substring(0, trun);
    res = `${pre}.${post}`;
    return res;
  }
  res = parseFloat(num).toFixed(trun);
  return res;
}
export const formatAmount = (amount: number, tickSize = 4) => {
  return truncate(amount, tickSize)
}

export function formatNumber(num: number | string, trun: number): string {
  const { digitGroupingSeparator, decimalSeparator } = formatIcon;

  const pt = `\\B(?=(\\d{3})+(?!\\d))`;
  const rex = new RegExp(pt, 'g');
  let formattedValue = num;
  const truncatedNumber = truncate(num, trun);

  const [pre, post] = truncatedNumber.toString().split('.');
  const truncatedPost = (post || '').padEnd(trun, '0').slice(-trun);
  const decimals =
    truncatedPost && truncatedPost.length > 0
      ? `${decimalSeparator}${truncatedPost}`
      : '';
  formattedValue = `${pre.replace(
    rex,
    `$&${digitGroupingSeparator}`,
  )}${decimals}`;
  return formattedValue;
}
export function formattedCurrency(
  num: number | string,
  tickSize = 4
): string {
  return trimZero(formatNumber(num, tickSize));
}
