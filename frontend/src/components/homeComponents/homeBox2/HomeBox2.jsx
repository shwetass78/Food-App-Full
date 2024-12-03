import { useState } from "react";
import "./homeBox2.css";

const HomeBox2 = () => {
  const [activeItem, setActiveItem] = useState("Vegan");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  return (
    <div className="homeBox2">
      <div className="homeBox2top">
        <div className="homeBox2topLeft">
          <h4>Up to -40% 🎊 Order.uk exclusive deals</h4>
        </div>
        <div className="homeBox2topRight">
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
        </div>
      </div>
      <div className="homeBox2Bottom">
        <div className="homeBox2BottomImgDiv">
          <img
            className="homeBox2BottomImg"
            src="./image/homeImage/Group10.png"
            alt=""
          />
        </div>
        <div className="homeBox2BottomImgDiv">
          <img
            className="homeBox2BottomImg"
            src="./image/homeImage/Group11.png"
            alt=""
          />
        </div>
        <div className="homeBox2BottomImgDiv">
          <img
            className="homeBox2BottomImg"
            src="./image/homeImage/Group12.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBox2;
