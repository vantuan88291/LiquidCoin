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
