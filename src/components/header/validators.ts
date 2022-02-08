import axios from "axios";

export function valiDatePassword(password: string): boolean {
  const reg = /^([\d\w{}]{6,})+$/gm;
  return reg.test(password);
}

export async function validateUserLogin(nick: string): Promise<string> {
  try {
    return await axios.get(`api/getUser/${nick}`).then((res) => res.data);
  } catch {
    throw new Error("Error");
  }
}
