// import { useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../Auth/auth";
const NavLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/RestaurantList",
    display: "Restaurants",
  },
  {
    path: "/Signup",
    display: "Signup",
  },
];

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    authLogout(navigate);
    console.log("Loggout!");
  };

  return (
    <header className="header flex items-center">
      <div className="container flex items-center justify-between w-full">
        {/*====logo *=====*/}
        <div>
          <img src={logo} alt="logo" />
        </div>

        {/**========Menu */}
        <div className="navigation">
          <ul className="menu flex items-center gap-[2.7rem]">
            {NavLinks.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive
                      ? "text-primary-Color text-[16px] leading-7 font-[600]"
                      : "text-text-Color text-[16px] leading-7 font-[500] hover:text-primary-Color"
                  }
                  activeClassName="active"
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/*==== Nav Right ====*/}
        <div className="flex items-center gap-4">
          <div className="hidden">
            <Link to="/">
              <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                <img
                  src="{userImg}"
                  alt="user"
                  className="w-full h-full rounded-full"
                />
              </figure>
            </Link>
          </div>

          <Link to="/login">
            <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center-justify-center rounded-[50px]">
              Login
            </button>
          </Link>

          <button
            onClick={logout}
            className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center-justify-center rounded-[50px]"
          >
            Logout
          </button>

          <span className="md:hidden">
            <BiMenu className="w-6 h-6 cursor-pointer" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
