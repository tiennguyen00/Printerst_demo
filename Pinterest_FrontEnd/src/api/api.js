import axios from "axios";

let unsplashApi = "https://api.unsplash.com";
let pixabayApi = "https://pixabay.com/api/";

const unsplash = axios.create({
  baseURL: unsplashApi,
  headers: {
    Authorization: "Client-ID USlO7ONMxpaG7ffnkl-6vgw2cAAQv6nEaXqNoSJuuHc",
  },
});

const pixabay = axios.create({
  baseURL: pixabayApi,
  header: {
    "X-RateLimit-Limit": 100,
  },
});
export { unsplash, pixabay };
