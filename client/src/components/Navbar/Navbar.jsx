import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { setLogout, setUser } from "../../redux/features/authSlice";
import "./navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();

  // setting user from localstorage of browser
  // ie after login we save our user's details(name, email, etc) in the browser's localstorage so that we can still access the user data even after the page is refreshed
  const [userProfile, setUserProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  // retriving user from redux store
  const res = useSelector((state) => state.auth);

  // logout button onClick function which delete the user data from localstorage and redux store
  const onLogout = () => {
    dispatch(setLogout());
    dispatch(setUser(null));
    window.location.reload();
  };

  return (
    <div className="navbar df aic jc-sb">
      <div className="logo">
        <Link className="link" to="/">
          <h1>ShareNeed</h1>
        </Link>
      </div>
      <div className="nav-links df aic">
        <Link className="link mr-1" to="/about">
          <button className="btn">About us</button>
        </Link>
        {userProfile || res.user ? (
          <>
            <Link className="link mr-1" to="/">
              <button onClick={onLogout} className="btn mr-1">
                {/* this button is only visible if we login or there exist a user  */}
                Logout
              </button>
            </Link>
            <Link className="link" to={`/user/${userProfile.result?._id}`}>
              {/* this button is only visible if we login or there exist a user  */}
              <CgProfile className="profile mr-1" />
            </Link>
          </>
        ) : (
          <Link className="link mr-1" to="/auth">
            {/* this button is only visible when there is no user  */}
            <button className="btn">Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
