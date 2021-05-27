import { baseApi } from "./baseApi";
import { IAuthorization } from "../interfaces/IAuthorization";
import { IUserRegistrationData } from "../interfaces/IUserRegistrationData";

export function login(loginData: IAuthorization) {
  return baseApi.post("/jwt-login", {
    emailAddress: loginData.emailAddress,
    password: loginData.password,
  });
}

export async function signUp(registerData: IUserRegistrationData) {
  return baseApi.post("/api/v1/entrance/signup", {
    fullName: registerData.fullName,
    emailAddress: registerData.emailAddress,
    password: registerData.password,
  });
}

export async function logOut() {
  return baseApi.get("/api/v1/account/logout");
}
