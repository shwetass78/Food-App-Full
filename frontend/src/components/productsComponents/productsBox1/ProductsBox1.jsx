import "./productsBox1.css";

const ProductsBox1 = () => {
  return (
    <div className="products">
      <div className="productsBox1Container">
        <div className="productsBox1Left">
          <p>I'm lovin it!</p>
          <h4>McDonald’s East London</h4>
          <div className="productsBox1LeftBtnDiv">
            <button className="productsBox1LeftBtn">
              <img src="./image/productsImage/OrderCompleted.png" alt="" />
              Minimum Order: 12 GBP
            </button>
            <button className="productsBox1LeftBtn">
              <img src="./image/productsImage/Motocross.png" alt="" />
              Delivery in 20-25 Minutes
            </button>
          </div>
        </div>

        <div className="productsBox1Right">
          <img src="./image/productsImage/Rectangle44.png" alt="" />
        </div>

        <div className="productsBox1Item1">
          <img src="./image/productsImage/Clock.png" alt="" />
          Open until 3:00 AM
        </div>

        <div className="productsBox1Item2">
          <img src="./image/productsImage/ratingImage.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ProductsBox1;
