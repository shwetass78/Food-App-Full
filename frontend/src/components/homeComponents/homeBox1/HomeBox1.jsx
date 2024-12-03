import "./homeBox1.css";

const HomeBox1 = () => {
  return (
    <div className="homeBox1">
      <div className="homeBox1Left">
        <p className="para1">Order Restaurant food, takeaway and groceries.</p>
        <h2>
          Feast Your Senses,
          <br />
          <span style={{ color: "#FC8A06" }}>Fast and Fresh</span>
        </h2>
        <p className="para2">Enter a postcode to see what we deliver</p>
        <div className="searchBox">
          e.g. EC4R 3TE
          <button className="homeSearchBtn">Search</button>
        </div>
      </div>
      <div className="homeBox1Right">
        <div className="homeBox1Right1">
          <img src="./image/homeImage/girl1.png" alt="" />
        </div>
        <div className="homeBox1Right2">
          <img src="./image/homeImage/girl2.png" alt="" />
        </div>
        <div className="homeBox1Right3">
          <p style={{ fontWeight: "bold" }}>We’ve Received your order!</p>
          <p>Awaiting Restaurant acceptance </p>
        </div>
        <div className="homeBox1Right4">
          <p style={{ fontWeight: "bold" }}>Order Accepted! </p>
          <p>Your order will be delivered shortly </p>
        </div>
        <div className="homeBox1Right5">
          <img src="./image/homeImage/Group3.png" alt="" />
        </div>
        <div className="homeBox1Right6">
          <img src="./image/homeImage/orangeBackground.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomeBox1;
