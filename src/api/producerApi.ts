import {baseApi} from "./baseApi";

const token = localStorage.getItem('accessToken');
export async function getProducersReq(queryParam?: string) {
  if(queryParam === undefined || queryParam === 'undefined' || queryParam === '')
    return baseApi.get("/api/v1/producer", { headers: {"Authorization" : `Bearer ${token}`}});
  return baseApi.get(`/api/v1/producer?qp=${queryParam}`, { headers: {"Authorization" : `Bearer ${token}`}});
}

export async function getProducerByIdReq(producerId: string) {
  return baseApi.get(`/api/v1/producer/${producerId}`, { headers: {"Authorization" : `Bearer ${token}`}});
}
