import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./products.css";
import ProductsBox1 from "../../components/productsComponents/productsBox1/ProductsBox1";
import ProductsBox3 from "../../components/productsComponents/productsBox3/ProductsBox3";
import CustomerReviews from "../../components/reviews/CustomerReviews";
import Footer from "../../components/footer/Footer";
import ProductsBox4 from "../../components/productsComponents/productsBox4/ProductsBox4";
import "leaflet/dist/leaflet.css";
import ProductsBox5 from "../../components/productsComponents/productsBox5/ProductsBox5";
import PopularRestaurants from "../../components/popularRestaurants/PopularRestaurants";

function Products() {
  return (
    <div className="productsContainer">
      <div className="productStickyDiv">
        <Navbar />
        <Header />
      </div>

      <div className="productScrollableDiv">
        <ProductsBox1 />
        <ProductsBox3 />
        <ProductsBox4 />
        <ProductsBox5 />
        <CustomerReviews />
        <PopularRestaurants heading="Similar Restaurants" />
        <Footer />
      </div>
    </div>
  );
}

export default Products;
