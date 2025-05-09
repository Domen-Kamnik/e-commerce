export type LoginResponseDTO = {
  accessToken: string;
  name: string;
};

export type LoginResponseError = {
  message: string;
};

export type RegistrationResponseDTO = {
  accessToken: string;
};

export type RegistrationResponseError = {
  email: boolean;
  name: boolean;
  password: boolean;
};
