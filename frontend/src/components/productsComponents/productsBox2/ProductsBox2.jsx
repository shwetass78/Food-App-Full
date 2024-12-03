import { useState } from "react";
import "./productsBox2.css";

const ProductsBox2 = () => {
  //   const [activeItem, setActiveItem] = useState("");

  //   const handleItemClick = (item) => {
  //     setActiveItem(item);
  //   };
  return (
    <div className="productsBox2">
      {/* <div className="productsBox2topRight">
        <ul>
          {["Vegan", "Sushi", "Pizza & Fast food", "Others"].map((item) => (
            <li
              key={item}
              onClick={() => handleItemClick(item)}
              className={activeItem === item ? "activeButton" : ""}
            >
              {item}
            </li>
          ))}
        </ul>
      </div> */}
      <div className="productsBox2Bottom">
        <div className="productsBox2BottomImgDiv">
          <img
            className="productsBox2BottomImg"
            src="./image/productsImage/Group23.png"
            alt=""
          />
        </div>
        <div className="productsBox2BottomImgDiv">
          <img
            className="productsBox2BottomImg"
            src="./image/productsImage/Group24.png"
            alt=""
          />
        </div>
        <div className="productsBox2BottomImgDiv">
          <img
            className="productsBox2BottomImg"
            src="./image/productsImage/Group25.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsBox2;
