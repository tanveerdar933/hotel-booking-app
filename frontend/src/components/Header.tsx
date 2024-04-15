import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">HotelsInn.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center bg-white text-blue-600 px-3 hover:bg-grey-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center bg-white text-blue-600 px-3 hover:bg-grey-100"
              >
                Register
              </Link>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
