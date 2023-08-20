import React from "react";
import { NavLink } from "react-router-dom";
import JobList from "../pages/JobList";
import AddJob from "../pages/AddJob";
const Header = () => {
  return (
    <header>
      <h1>İşini Bul</h1>
      <div>
        <NavLink to={"/"}>İş Listesi</NavLink>
        <NavLink to={"/add-job"}>İş Ekle</NavLink>
      </div>
    </header>
  );
};

export default Header;
