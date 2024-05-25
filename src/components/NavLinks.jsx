const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "about", text: "about" },
  { id: 3, url: "products", text: "products" },
  { id: 4, url: "checkout", text: "checkout" },
  { id: 5, url: "orders", text: "orders" },
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
