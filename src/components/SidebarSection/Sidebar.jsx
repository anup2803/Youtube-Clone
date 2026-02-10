import React from "react";
import { useTheme } from "../../useContextHook/useTheme";
import { useAppContext } from "../../useContextHook/useContextApi";
import MenuItems from "./MenuItems";
import { useNavigate } from "react-router-dom";
import { categories, menuItems } from "../../utils/constant";

const Sidebar = () => {
  const { isDarkMode } = useTheme();
  const { mobileMenu, selectedCategory, setSelectedCategory } = useAppContext();

  const navigate = useNavigate();

  const handleCategoryClick = (id, name) => {
    setSelectedCategory(id);
    if (name === "Home") navigate("/");
  };

  return (
    <div
      className={`md:block overflow-y-auto h-full py-4 w-[300px] mt-2 absolute md:relative
        ${mobileMenu ? "block z-10" : "hidden md:block"}
        ${isDarkMode ? "bg-gray-900 border-gray-700" : "border-gray-200 bg-white"}`}
    >
      <div className="flex flex-col px-5 mb-20">
        {categories.map((item) => (
          <MenuItems
            key={item.id}
            item={item}
            isSelected={item.id === selectedCategory}
            onClick={() => handleCategoryClick(item.id, item.name)}
          />
        ))}

        <hr
          className={`my-3 ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        />

        {menuItems.map((item) => (
          <MenuItems key={item.name} item={item} isSelected={false} />
        ))}

        <hr
          className={`my-3 ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        />

        <div className="flex items-center text-sm justify-center">
          <span>Made by Anup kumal</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
