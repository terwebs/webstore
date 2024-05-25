import { useSelector } from "react-redux";
import { SectionTitle } from "../components";
import { OrdersList } from "../components";

export default function Orders() {
  const orders = useSelector((state) => state.orders);

  console.log(orders);
  if (orders.length === 0) {
    return <SectionTitle text="You don't have any order yet" />;
  }
  return (
    <div>
      <SectionTitle text="Your orders" />
      <OrdersList />
    </div>
  );
}
