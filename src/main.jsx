import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Counter from "./counterApp.jsx";
import ColorPicker from "./ColorPickerApp.jsx";
import ShoppingListApp from "./ShoppingListApp.jsx";
import ShoppingApp from "./NewShoppingList.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShoppingApp />,
  </React.StrictMode>
);
