import { Link } from "react-router-dom";
import "../styles/Hero.css";
const Heroo = () => {
    return (
        <div className="topbar border-b border-gray-800">
            <br />

            {/* <div className="hero bg-base-350 bg-blend-overlay">
            <div className="hero-content text-center"> */}
            {/* <div className="heroo bg-base-350 bg-blend-overlay flex items-center justify-center w-1/3 "> */}

            <div className="flex space-x-4 ">
                <div className="heroo bg-base-350 bg-blend-overlay flex-1">
                    <div className="heroo-content text-center">
                    </div>
                </div>
                <div className="heroo1 bg-base-350 bg-blend-overlay flex-1">
                    <div className="heroo1-content text-center">
                    </div>
                </div>
            </div>

            <div className="flex ">
                <div className="heroo-content text-center ">
                </div>
                <div className="flex items-center justify-center flex-1">
                    <div className="max-w-xl text-center">
                        <h1 className="text-6xl font-bold max-md:text-4xl text-accent-content">T-Shirts</h1>
                        <p className="py-6 text-2xl max-md:text-lg text-accent-content">
                            חולצות הטי שכולם רוצים בקיץ!
                        </p>
                        <Link to="/shop?stock=true&category=T-Shirts" className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white">קנה עכשיו</Link>
                    </div>
                </div>
                <div className="heroo1-content text-center">
                </div>
                <div className="flex items-center justify-center flex-1">
                    <div className="max-w-xl text-center">
                        <h1 className="text-6xl font-bold max-md:text-4xl text-accent-content">Polo-Shirts</h1>
                        <p className="py-6 text-2xl max-md:text-lg text-accent-content">
                            חולצות הטי שכולם רוצים בקיץ!
                        </p>
                        <Link to="/shop?stock=true&category=Shirts" className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white">קנה עכשיו</Link>
                    </div>
                </div>
            </div>

            
        </div>



    )
}

export default Heroo