import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import logo from "../assests/logo.png";
import brandImage from "../assests/quco.png";
import { RiDashboardFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiStoreFill } from "react-icons/ri";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import TopNav from "./TopNav";
import Swal from "sweetalert2";

function SideNav() {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setsubmenuOpen] = useState(null);

  const location = useLocation();

  const getIcon = (icon, highlightedIcon, routes) => {
    const currentRoute = location.pathname.split("/").pop();
    return routes.includes(currentRoute) ? highlightedIcon : icon;
  };

  const isActiveTab = (route) => location.pathname.startsWith(route);

  const Menus = [
    { title: "Dashboard", path: "/main/dashboard" },
    {
      title: "Admin",
      icon: <MdAdminPanelSettings />,
      submenu: true,
      submenuItems: [
        { title: "Permissions", path: "main/permissions" },
        { title: "Users", path: "main/users" },
      ],
    },
    {
      title: "Product",
      icon: <RiStoreFill />,
      submenu: true,
      submenuItems: [
        { title: "Product Master", path: "/main/product-master" },
        { title: "Add Products", path: "main/add-products" },
      ],
    },
    {
      title: "Purchase Order",
      icon: <FaClipboardList />,
      submenu: true,
      submenuItems: [
        { title: "With Po", path: "/main/withpo" },
        { title: "Without Po", path: "/main/withoutpo" },
      ],
    },
    {
      title: "Stock",
      icon: <BsClipboard2CheckFill />,
      submenu: true,
      submenuItems: [
        { title: "Stock In", path: "/main/stock-in" },
        { title: "Stock Out", path: "/main/stock-out" },
      ],
    },
    { title: "Report", path: "/main/report", icon: <RiFileList3Fill /> },
    { title: "Profile", path: "/main/profile", icon: <FaUser /> },
    { title: "Logout", icon: <FaSignOutAlt /> },
  ];

  const toggleSubmenu = (index) => {
    setOpen(true);
    setsubmenuOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleLogoutClick = () => {
    setOpen(true);
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Logout confirmed");
      }
    });
  };

  return (
    <div className="flex">
      <div
        className={`bg-black min-h-screen p-5 ${open ? "w-52" : "w-20"} duration-300 relative`}
      >
        <div className="inline-flex">
          <img
            alt="logo"
            src={logo}
            className={`bg-amber-50 rounded cursor-pointer block float-left duration-500 ${!open && "rotate-[360deg]"}`}
            onClick={() => setOpen(!open)}
          />
          <img
            alt="brand"
            src={brandImage}
            className={`h-8 w-auto duration-300 ${!open && "scale-0"}`}
          />
        </div>

        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <div key={index}>
              <NavLink
                to={menu.path || "#"}
                className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#374151] rounded-md mt-5 h-12 ${
                  isActiveTab(menu.path) ? 'bg-[#374151]' : ''
                }`}
                onClick={() => {
                  setOpen(true); 
                  if (menu.title === "Logout") {
                    handleLogoutClick();
                  } else if (menu.submenu) {
                    toggleSubmenu(index);
                  }
                }}
              >
                <span className="text-lg flex items-center justify-center h-full">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>
                  {menu.title}
                </span>
                {menu.submenu && open && (
                  <BsChevronDown className={`${submenuOpen === index && "rotate-180"}`} />
                )}
              </NavLink>
              {menu.submenu && submenuOpen === index && open && (
                <ul>
                  {menu.submenuItems.map((submenuItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={submenuItem.path}
                      className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 px-8 hover:bg-[#374151] rounded-md"
                    >
                      {submenuItem.title}
                    </NavLink>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        <TopNav />
        <div className="p-7">
          <h1 className="text-2xl font-semibold "></h1>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
