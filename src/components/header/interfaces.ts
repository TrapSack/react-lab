export interface ITempUser {
  login: string;
  password: string;
  confirmPassword?: string;
}

export interface IError {
  loginInputError?: string;
  passwordInputError?: string;
  confirmPasswordInputError?: string;
}
