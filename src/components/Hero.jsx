import { Link } from "react-router-dom";
import "../styles/Hero.css";
const Hero = () => {
  return (
    <div className="hero bg-base-350 bg-blend-overlay">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-6xl font-bold max-md:text-4xl text-accent-content text-white">Best Clothing Shop Of The Year!</h1>
          <p className="py-6 text-2xl max-md:text-lg text-accent-content">
          </p>
          <Link to="/shop?stock=true" className="btn btn-wide bg-white text-black border border-black hover:font-bold hover:border-2">!קנה עכשיו</Link>
          </div>
      </div>
    </div>
  )
}

export default Hero