// SlideMenu.js
import React from "react";
import { Menu } from "antd";
import CustomMenuItem from "./CustomMenuItem";

const SlideMenu = ({ menuItems, onClose }) => (
  <div className="slide-menu-overlay" onClick={onClose}>
    <div className="slide-menu">
      <Menu theme="dark" mode="vertical" onClick={onClose}>
        {menuItems.map((item, index) => (
          <CustomMenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
          />
        ))}
      </Menu>
    </div>
  </div>
);

export default SlideMenu;
