import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../redux/slices/userLoginSlice";

function Header() {
  let { currentUser, loginStatus } = useSelector((state) => state.userLogin);
  let dispatch = useDispatch();

  function signout() {
    sessionStorage.removeItem("token");
    dispatch(resetState());
  }

  return (
    <nav
      className="navbar navbar-expand-sm w-100 fixed-top fs-5"
      style={{
        backgroundColor: "var(--medium-maroon)",
        margin: "0",
        padding: "0",
      }}
    >
      <div id="container1" className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav ms-auto mb-2 mb-lg-0"
            style={{
              fontFamily: "sans-serif",
              fontWeight: "Normal",
            }}
          >
            {loginStatus === false ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="signup">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="signin">
                    LogIn
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink
                  className="nav-link text-medium"
                  to="signin"
                  style={{color:"white"}}
                  onClick={signout}
                >
                  <span
                    className="lead fs-4 me-3 fw-normal"
                    style={{
                      color: "green",
                      fontSize: "1.3rem",
                      textTransform: "capitalize",
                      fontFamily: "Fantasy",
                    }}
                  >
                    Username: {currentUser.username}
                  </span>
                  Signout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
