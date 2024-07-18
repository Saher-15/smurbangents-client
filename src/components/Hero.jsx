import { Link } from "react-router-dom";
import "../styles/Hero.css";
const Hero = () => {
  return (
    <div className="hero bg-base-500 bg-blend-overlay">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold max-md:text-2xl text-accent-content text-white">ברוכים הבאים לחנות האונליין <br/> URBAN GENTS </h1>
          <p className="py-6 text-2xl max-md:text-lg text-accent-content">
          </p>
          <Link to="/shop?stock=true" className="btn btn-wide bg-blue-900 hover:bg-blue-700 text-white">!קנה עכשיו</Link>
          </div>
      </div>
    </div>
  )
}

export default Hero