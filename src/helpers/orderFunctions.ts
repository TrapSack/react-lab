import axios from "axios";

export function addOrder(login: string, name: string, platform: string, price: number) {
  axios.post("/api/addOrder/", {
    login,
    order: {
      name,
      amount: 1,
      orderDate: new Date().toLocaleDateString("en-US"),
      platform,
      price,
    },
  });
}

export function updateOrderAmount(name: string, login: string, amount?: number) {
  axios.post("/api/updateOrder/", {
    orderName: name,
    login,
    amount,
  });
}
