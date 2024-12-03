import "./productsBox3.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import ProductsBox2 from "../productsBox2/ProductsBox2";
import BASE_URL from "../../../config";

const ProductsBox3 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalAmount,
    isCartOpen,
    toggleCart,
  } = useCart();

  const [activeItem, setActiveItem] = useState("Offers");
  const categories = ["Burger", "Fries", "Pizza"];

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSearchTerm(category);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const allProducts = response.data[Object.keys(response.data)[0]] || [];
        setProducts(allProducts);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching products data"
        );
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user.token]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("Your cart link here");
    alert("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="productsBox3">
      <div className="searchBoxHeader">
        <div className="searchBoxHeaderTop">
          <h4>All Offers from McDonald’s East London</h4>
          <form onSubmit={handleSearch} className="searchForm">
            <img src="./image/productsImage/SearchIcon.png" alt="" />
            <input
              type="text"
              placeholder="Search from menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchInput"
            />
          </form>
        </div>
        <div className="searchBoxHeaderBottom">
          <ul>
            {[
              "Offers",
              "Burgers",
              "Fries",
              "Snacks",
              "Salads",
              "Cold drinks",
              "Happy",
              "Meal",
              "Desserts",
              "Hot drinks",
              "Sauces",
              "Orbit",
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
      <ProductsBox2 />

      {/* ------------------------- */}

      <div className="category_cart_container">
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="categoryContainer">
            {filteredCategories.map((category) => (
              <div key={category} className="category">
                <h2>{category}</h2>
                <div className="itemContainer">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <div key={`${category}-${product._id}`} className="item">
                        <div className="itemLeft">
                          <h3>{product.name}</h3>
                          <p>{product.description}</p>
                          <p className="price">
                            Rs. {product.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="itemRight">
                          <img src={product.image} alt={product.name} />
                        </div>
                        <div className="itemBtn">
                          <button
                            className="addToCartBtn"
                            onClick={() => addToCart(product)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="noProducts">
                      No products available in this category
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {isCartOpen && (
          <div className="cartContainer">
            <div className="shareCartContainer">
              <div className="shareImg">
                <img
                  src="./image/productsImage/share.png
                "
                  alt="share image"
                />
              </div>
              <div className="textContainer">
                <span className="ShareText">Share this cart</span>
                <br />
                <span className="ShareText">with your friends</span>
              </div>
              <div className="shareBtnBox">
                <button className="copyLinkBtn" onClick={handleCopyLink}>
                  Copy Link
                </button>
              </div>
            </div>
            <div className="myCart">
              <div className="myCartHeader">
                <h2>My Basket</h2>
                <button className="closeCartBtn" onClick={toggleCart}>
                  ×
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <>
                  <div className="cartItemsContainer">
                    {cartItems.map((item) => (
                      <div key={item._id} className="cartItems">
                        <div className="cartItemsLeft">
                          <div className="itemNoBox">{item.quantity}x</div>
                        </div>
                        <div className="cartItemsMid">
                          <p>Rs {item.price.toFixed(2)}</p>

                          <h3>{item.name}</h3>
                        </div>
                        <div className="cartItemsRight">
                          <button
                            className="deleteItem"
                            onClick={() => removeFromCart(item._id)}
                          >
                            <img
                              src="./image/productsImage/Delete.png"
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="chargesContainer">
                    <ul>
                      <li>
                        <span>Sub Total:</span>
                        <span>Rs {getTotalAmount().toFixed(2)}</span>
                      </li>
                      <li>
                        <span>Discounts:</span>
                        <span>Rs 0</span>
                      </li>
                      <li>
                        <span>Delivery Fee:</span>
                        <span>Rs 0</span>
                      </li>
                    </ul>
                  </div>
                  <div className="totalCharges">
                    <ul>
                      <li className="total">
                        <span>Total to pay </span>
                        <span style={{ fontSize: "32px" }}>
                          Rs {getTotalAmount().toFixed(2)}
                        </span>
                      </li>
                      <li className="otherOffers">
                        <span>Choose your free item..</span>
                        <span>
                          <img
                            src="./image/productsImage/downArrow.png"
                            alt=""
                          />
                        </span>
                      </li>
                      <li className="otherOffers">
                        <span>Apply Coupon Code here</span>
                        <span>
                          <img
                            src="./image/productsImage/rightArrow.png"
                            alt=""
                          />
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="checkoutBtnContainer">
                    <div className="topBoxOther">
                      <div className="scooter">
                        <img
                          src="./image/productsImage/scotter.png"
                          alt="scooter"
                        />
                        <span>Delivery</span>
                        <span>Starts at 17:50</span>
                      </div>
                      <div className="store">
                        <img
                          src="./image/productsImage/store.png"
                          alt="store"
                        />
                        <span>Collection</span>
                        <span> Starts at 16:50</span>
                      </div>
                    </div>
                    <div className="checkoutButtonDiv">
                      <span className="arrow">
                        <img
                          src="./image/productsImage/forwardArrow.png"
                          alt=""
                        />
                      </span>
                      <span className="checkoutText">
                        <Link to="/checkout" className="checkoutTextLink">
                          Checkout
                        </Link>
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsBox3;
