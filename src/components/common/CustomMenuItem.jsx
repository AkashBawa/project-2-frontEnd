// CustomMenuItem.js
import React from "react";
import { Menu } from "antd";

const CustomMenuItem = ({ icon, label, onClick }) => (
  <Menu.Item onClick={onClick}>
    {icon && <span className="anticon">{icon}</span>}
    <span>{label}</span>
  </Menu.Item>
);

export default CustomMenuItem;
