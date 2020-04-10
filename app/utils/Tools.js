function toEnglishDigits(str) {

  // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
  let e = '۰'.charCodeAt(0);
  str = str.replace(/[۰-۹]/g, function(t) {
    return t.charCodeAt(0) - e;
  });
  return str;
}

function formatPrice(val) {
  return String(val).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


export default {
  toEnglishDigits,
  formatPrice
}
