export type CheckoutSessionRequest = {
  cartItems:{
    name:string;
    image:string;
    price:string;
    quantity:string;
  }[];
  deliveryDetails:{
    name:string;
    email:string;
    address:string;
    city:string;
    country:string
  },
  restaurant:string;
}
export interface Orders extends CheckoutSessionRequest {
  _id:string;
  status:string;
  totalAmount:number;
}
export type OrderState = {
  loading:boolean;
  orders:Orders[];
  createCheckoutSession: (checkoutSessionRequest:CheckoutSessionRequest, user: any) => Promise<void>;
  getOrderDetails: () => Promise<void>;
}