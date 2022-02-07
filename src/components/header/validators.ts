import axios from "axios";

export function valiDatePassword(password: string): boolean {
  const reg = /^(\d|\w){6,}+$/;
  return reg.test(password);
}

export function validateUserLogin() {}
