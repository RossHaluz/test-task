"use client";
import React from "react";
import { Button } from "./ui/button";
import Cookies from "js-cookie";

const LogoutBtn = () => {
  const handleLogout = () => {
    Cookies.remove("token");
  };

  return <Button type="button" variant="outline"></Button>;
};

export default LogoutBtn;
