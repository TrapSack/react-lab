import axios from "axios";

export function valiDatePassword(password: string): boolean {
  const reg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=\S+$).{8,}$/gm;
  return reg.test(password);
}

export async function validateUserLogin(nick: string): Promise<string> {
  try {
    return await axios.get(`api/getUser/${nick}`).then((res) => res.data);
  } catch {
    throw new Error("Error");
  }
}
