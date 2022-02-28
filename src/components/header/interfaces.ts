export interface ITempUser {
  login: string;
  password: string;
  confirmPassword?: string;
  adress: string;
  phone: string;
}

export interface IError {
  loginInputError?: string;
  passwordInputError?: string;
  confirmPasswordInputError?: string;
}
