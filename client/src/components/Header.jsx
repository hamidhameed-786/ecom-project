import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faIdBadge,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <header className="w-full h-auto bg-blue-600 flex justify-between border-2 border-amber-700 py-4">
        <div className="w-1/5 text-[#ffffff] text-[20px]">
          <Link to={"/"}>Hamid'Store</Link>
        </div>

        <nav className="w-1/2  flex justify-center">
          <ul className="h-auto w-full flex justify-evenly">
            <li className="text-[20px] text-[#ffffff]">
              <Link to={"/"}>Home</Link>
            </li>

            <li className="text-[20px] text-[#ffffff]">
              <Link to={"/shop"}>Shop</Link>
            </li>

            <li className="text-[20px] text-[#ffffff]">
              <Link to={"/collection"}>Category</Link>
            </li>

            <li className="text-[20px] text-[#ffffff]">
              <Link to={"/cart"}>Cart</Link>
            </li>

            <li className="text-[20px] text-[#ffffff]">
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="w-1/5  flex justify-end items-center mr-10">
          <Link to={"/cart"}>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-[#ffffff] text-[16px] p-1.5"
            />
          </Link>

          <Link to={"login"}>
            <FontAwesomeIcon
              icon={faUser}
              className="text-[#ffffff] text-[16px] p-1.5"
            />
          </Link>
        </div>
      </header>
    </>
  );
}
export default Header;
