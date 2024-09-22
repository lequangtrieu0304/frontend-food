import { CheckoutSessionRequest, OrderState } from "@/types/orderType";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {User} from "@/stores/useUserStore.ts";

const API_END_POINT: string = "http://localhost:3000";
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(persist((set => ({
  loading: false,
  orders: [],
  createCheckoutSession: async (checkoutSession: CheckoutSessionRequest, user: User) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_END_POINT}/api/v1/orders/create-checkout-session`, checkoutSession, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
      window.location.href = response.data.data.url;
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  getOrderDetails: async () => {
    try {
      set({loading:true});
      const response = await axios.get(`${API_END_POINT}/`);

      set({loading:false, orders:response.data.orders});
    } catch (error) {
      set({loading:false});
    }
  }
})), {
  name: 'order-name',
  storage: createJSONStorage(() => localStorage)
}))