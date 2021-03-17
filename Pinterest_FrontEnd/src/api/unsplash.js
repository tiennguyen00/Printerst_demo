import axios from "axios";
import React from "react";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID USlO7ONMxpaG7ffnkl-6vgw2cAAQv6nEaXqNoSJuuHc",
  },
});
