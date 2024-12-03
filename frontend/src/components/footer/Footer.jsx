import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="box2">
          <div className="box22">
            <img src="./image/Logo_2.png" alt="Logo_2" className="logo_2" />
            <img
              src="./image/app-store-badges.png"
              alt="store"
              className="storeFooter"
            />
            <div>
              <p>Company # 490039-445, Registered with </p>
              <p>House of companies.</p>
            </div>
          </div>
        </div>
        <div className="box3">
          <div className="box33">
            <h4>Get Exclusive Deals in your Inbox</h4>
            <div className="mailBox">
              youremail@gmail.com{" "}
              <button className="subscribeBtn">Subscribe</button>
            </div>
            <div className="desc">
              we wont spam, read our{" "}
              <span className="descSpan">email policy</span>
            </div>
            <ul className="socialIconBox">
              <li>
                <img src="./image/Facebook.png" alt="Facebook" />
              </li>
              <li>
                <img src="./image/Instagram.png" alt="Instagram" />
              </li>
              <li>
                <img src="./image/TikTok.png" alt="TikTok" />
              </li>
              <li>
                <img src="./image/Snapchat.png" alt="Snapchat" />
              </li>
            </ul>
          </div>
        </div>
        <div className="box4">
          <div className="leftList">
            <h4>Legal Pages</h4>
            <ul>
              <li>Terms and conditions</li>
              <li>Privacy</li>
              <li>Cookies</li>
              <li>Modern Slavery Statement</li>
            </ul>
          </div>
          <div className="rightList">
            <h4>Important Links</h4>
            <ul>
              <li>Get help</li>
              <li>Add your restaurant</li>
              <li>Sign up to deliver</li>
              <li>Create a business account</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="bottomBox1">
          <p>Order.uk Copyright 2024, All Rights Reserved.</p>
        </div>
        <div className="bottomBox1">
          <ul>
            <li>Privacy Policy </li>
            <li>Terms</li>
            <li>Pricing</li>
            <li>Do not sell or share my personal information</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
