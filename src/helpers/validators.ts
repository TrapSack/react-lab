export function validatePhone(phone: string) {
  const reg = /^\+(?:[0-9]●?){6,14}[0-9]$/gm;
  return reg.test(phone);
}
export function validateAdress(adress: string) {
  const reg = /\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\./gm;
  return reg.test(adress);
}
