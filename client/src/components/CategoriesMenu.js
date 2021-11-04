import React from "react";
import { useAppContext } from "../context/AppContext";
import { useAuthContext } from "../context/AuthContext";

import MiniLoading from "./MiniLoading";
import useFetch from "../hooks/useFetch";

const CategoriesMenu = () => {
  const { authToken } = useAuthContext();
  const { selectedCategories, setSelectedCategories, animals } =
    useAppContext();

  const url = `http://localhost:3001/categories`;
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  };
  const { data: categories, loading } = useFetch(url, options, [animals]);

  const toggleButtonClass = (id) => {
    const buttonClasses =
      selectedCategories.indexOf(id) !== -1
        ? "category-btn btn-selected"
        : "category-btn";
    return buttonClasses;
  };

  const toggleCategoryButtons = (id) => {
    const selectedIndex = selectedCategories.indexOf(id);
    if (selectedIndex === -1) {
      setSelectedCategories((currentIds) => [...currentIds, id]);
    } else {
      setSelectedCategories((currentIds) =>
        currentIds.filter((currentId) => currentId !== id)
      );
    }
  };
  if (loading) {
    return <MiniLoading />;
  }
  return (
    <>
      <div className="btn-container">
        {categories &&
          categories.map((categoryItem, index) => {
            return (
              <button
                key={index}
                className={toggleButtonClass(categoryItem.id)}
                onClick={() => toggleCategoryButtons(categoryItem.id)}
              >
                {categoryItem.category}
              </button>
            );
          })}
      </div>
    </>
  );
};

export default CategoriesMenu;
