import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

export default function OrdersList() {
  const orders = useSelector((state) => state.orders);
  console.log(orders);
  return (
    <div className="mt-8">
      <div>
        <table className="table table-zebra">
          {/* HEADER */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Total</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              console.log(order);
              const {
                id,
                name,
                address,
                numItemsInCart,
                orderTotal,
                timestamp,
              } = order;
              const date = day(timestamp).format("MMM Do, YYYY - hh:mm A");
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className="hidden sm:block">{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
