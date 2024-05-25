import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import { formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { addOrder } from "../features/orders/ordersSlice";
import { nanoid } from "nanoid";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info = {
      id: nanoid(),
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
      timestamp: new Date().toISOString(),
    };

    store.dispatch(addOrder(info));
    store.dispatch(clearCart());

    toast("order placed");
    return redirect("/orders");
  };

export default function CheckoutForm() {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">Shipping information</h4>
      <FormInput label="First Name" name="name" type="text" required={true} />
      <FormInput
        label="Shipping Address"
        name="address"
        type="text"
        required={true}
      />
      <div className="mt-4">
        <SubmitButton text="Place Order" />
      </div>
    </Form>
  );
}
