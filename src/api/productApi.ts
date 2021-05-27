import {baseApi} from "./baseApi";
import { IProduct } from "../interfaces/IProduct";

const token = localStorage.getItem('accessToken');

export async function getProductTypesReq() {
  return baseApi.get("/api/v1/product-types", { headers: {"Authorization" : `Bearer ${token}`}});
}

export async function getProductsReq(queryParam?: string) {
  if (queryParam === undefined || queryParam === 'undefined' || queryParam === "")
    return baseApi.get("/api/v1/product", { headers: {"Authorization" : `Bearer ${token}`}});
  return baseApi.get(`/api/v1/product?qp=${queryParam}`, { headers: {"Authorization" : `Bearer ${token}`}});
}

export async function getProductByIdReq(productId: string) {
  return baseApi.get(`/api/v1/product/${productId}`, { headers: {"Authorization" : `Bearer ${token}`}});
}

export async function createProductReq(values: IProduct) {
  return baseApi.post(
    "/api/v1/product",
    {
      productName: values.productName,
      price: values.price,
      substancePercentage: values.substancePercentage,
      color: values.color,
      type: values.type,
      producer: values.producer,
    },
    { headers: {"Authorization" : `Bearer ${token}`}}
  );
}
