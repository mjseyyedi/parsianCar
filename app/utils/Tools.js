function toEnglishDigits(str) {

  // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
  let e = '۰'.charCodeAt(0);
  str = str.replace(/[۰-۹]/g, function(t) {
    return t.charCodeAt(0) - e;
  });
  return str;
}

export default {
  toEnglishDigits
}
