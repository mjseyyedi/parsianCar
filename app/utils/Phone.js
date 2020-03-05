function phoneNumberValidation(phoneNumber) {
  let regex = /(?:^0?$|^09?$|^09)\d{0,9}$/g
  return regex.test(phoneNumber)
}


export default {
  phoneNumberValidation
}
