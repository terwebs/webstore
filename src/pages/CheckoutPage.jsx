import { useSelector } from "react-redux";
import { CheckoutForm, SectionTitle, CartTotals } from "../components";

export default function Checkout() {
  const cartItemsNum = useSelector((state) => state.cartState.cartTotal);
  if (cartItemsNum === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }
  return (
    <>
      <SectionTitle text="place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
}
