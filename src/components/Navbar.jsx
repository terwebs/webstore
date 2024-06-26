import { BsCart3, BsMoonFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdSunny } from "react-icons/md";
import NavLinks from "./NavLinks";
import logo from "../assets/logo.png";

// use this to load the data from redux state
import { useSelector } from "react-redux";

const themes = {
  pastel: "pastel",
  sunset: "sunset",
};

const getThemeFromLocalStorage = () => {
  return localStorage.getItem("theme") || themes.pastel;
};

export default function Navbar() {
  const [theme, setTheme] = useState(getThemeFromLocalStorage);

  const handleTheme = () => {
    const { pastel, sunset } = themes;
    const newTheme = theme === pastel ? sunset : pastel;
    document.documentElement.setAttribute("data-theme", theme);
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  return (
    <nav className="bg-base-200">
      <div className="navbar align-elements ">
        <div className="navbar-start">
          {/* TITLE */}
          <NavLink
            to="/"
            className="hidden lg:flex  text-3xl items-center rounded-box"
          >
            <img src={logo} className="w-14" />
          </NavLink>
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden" htmlFor="">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/* THEME ICONS */}
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />
            {/* SUN */}
            <MdSunny className=" swap-on h-4 w-4" />
            {/* MOON */}
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>

          {/* CART LINK*/}
          <NavLink to="cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {numItemsInCart}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
