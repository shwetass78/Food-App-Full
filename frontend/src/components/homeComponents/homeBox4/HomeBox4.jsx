import { useState } from "react";
import "./homeBox4.css";

const HomeBox4 = () => {
  const [activeItem, setActiveItem] = useState("Frequent Questions");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="homeBox4">
      <div className="homeBox4Item1">
        <img src="./image/homeImage/OrderingApp.png" alt="ordering app" />
      </div>
      <div className="homeBox4Item2">
        <div className="homeBox4Item2Img1">
          <img src="./image/homeImage/Group15.png" alt="" />
        </div>
        <div className="homeBox4Item2Img2">
          <img src="./image/homeImage/Group16.png" alt="" />
        </div>
      </div>
      <div className="homeBox4Item3">
        <div className="homeBox4Item3TopBox">
          <div className="homeBox4Item3TopLeft">
            <h4>Know more about us!</h4>
          </div>
          <div className="homeBox4Item3TopRight">
            <ul>
              {[
                "Frequent Questions",
                "Who we are?",
                "Partner Program",
                "Help & Support",
              ].map((item) => (
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
        <div className="homeBox4Item3BottomBox">
          <div className="homeBox4Item3BottomBoxLeft">
            <button className="homeBox4Item3Btn1">
              How does Order.UK work?
            </button>
            <p>What payment methods are accepted?</p>
            <p>Can I track my order in real-time?</p>
            <p>Are there any special discounts or</p>
            <p>promotions available?</p>
            <p>Is Order.UK available in my area?</p>
          </div>
          <div className="homeBox4Item3BottomBoxRight">
            <div className="homeBox4Item3CardBox">
              <div className="homeBox4Item3Card">
                <h4>Place an Order! </h4>
                <img
                  className="homeBox4Item3CardImg"
                  src="./image/homeImage/placeOrder.png"
                  alt=""
                />
                <p>
                  Place order through our <br />
                  website or Mobile app
                </p>
              </div>
              <div className="homeBox4Item3Card">
                <h4>Track Progress </h4>
                <img
                  className="homeBox4Item3CardImg"
                  src="./image/homeImage/trackProgress.png"
                  alt=""
                />
                <p>
                  Your can track your order <br />
                  status with delivery time
                </p>
              </div>
              <div className="homeBox4Item3Card">
                <h4>Get your Order! </h4>
                <img
                  className="homeBox4Item3CardImg"
                  src="./image/homeImage/getOrder.png"
                  alt=""
                />
                <p>
                  Receive your order at a <br />
                  lighting fast speed!
                </p>
              </div>
            </div>
            <div className="homeBox4Item3DescBox">
              <p>
                Order.UK simplifies the food ordering process. Browse through
                our diverse menu,
              </p>
              <p>
                select your favorite dishes, and proceed to checkout. Your
                delicious meal will be
              </p>
              <p>on its way to your doorstep in no time!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="homeBox4Item4">
        <div className="homeBox4Item4Item">
          <p>546+</p>
          <p>Registered Riders</p>
        </div>
        <div className="homeBox4Item4Item">
          <p>789,900+</p>
          <p>Orders Delivered</p>
        </div>
        <div className="homeBox4Item4Item">
          <p>690+</p>
          <p>Restaurants Partnered</p>
        </div>
        <div className="homeBox4Item4Item1">
          <p>17,457+</p>
          <p>Food items</p>
        </div>
      </div>
    </div>
  );
};

export default HomeBox4;
