import {
  HomeLayoutPage,
  LandingPage,
  ErrorPage,
  ProductsPage,
  SingleProductPage,
  CartPage,
  AboutPage,
  CheckoutPage,
  OrdersPage,
} from "./pages";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error } from "./components/";
// loaders
import { loader as landingLoader } from "./pages/LandingPage";
import { loader as singleProductLoader } from "./pages/SingleProductPage";
import { loader as productsLoader } from "./pages/ProductsPage";
// actions
import { action as checkoutAction } from "./components/CheckoutForm";
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        loader: landingLoader,
        errorElement: <Error />,
      },
      {
        path: "products",
        element: <ProductsPage />,
        errorElement: <Error />,
        loader: productsLoader,
      },
      {
        path: "products/:id",
        element: <SingleProductPage />,
        errorElement: <Error />,
        loader: singleProductLoader,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      { path: "about", element: <AboutPage /> },
      {
        path: "checkout",
        element: <CheckoutPage />,
        action: checkoutAction(store),
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
