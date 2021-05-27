import {baseApi} from "./baseApi";

const token = localStorage.getItem('accessToken');

export async function getProfileReq() {
    return baseApi.get("/account/profile", { headers: {"Authorization" : `Bearer ${token}`}});
}

export async function getUsersReq() {
  return baseApi.get("/api/v1/user", { headers: {"Authorization" : `Bearer ${token}`}});
}
