const links = [
  { id: 1, url: "/", text: "inicio" },
  { id: 2, url: "about", text: "acerca de" },
  { id: 3, url: "products", text: "productos" },
  // { id: 4, url: "checkout", text: "pago" },
  // { id: 5, url: "orders", text: "pedidos" },
];

import { NavLink } from "react-router-dom";

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <li key={id}>
            <NavLink className="capitalize rounded-full" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
}
