import { Link } from "react-router-dom";
import "../styles/Hero.css";
const Herooo = () => {
    return (
        <div className="topbar border-b border-gray-800">
            <br />

            <div className="flex space-x-4">
                <div className="heroo2 bg-base-350 bg-blend-overlay flex-1">
                    <div className="heroo2-content text-center">
                    </div>
                </div>
                <div className="heroo3 bg-base-350 bg-blend-overlay flex-1">
                    <div className="heroo3-content text-center">
                    </div>
                </div>
            </div>

            <div className="flex">
                <div className="heroo2-content text-center">
                </div>
                <div className="flex items-center justify-center flex-1">
                    <div className="max-w-xl text-center">
                        <h1 className="text-6xl font-bold max-md:text-4xl text-accent-content">Jeans</h1>
                        <p className="py-6 text-2xl max-md:text-lg text-accent-content">
                            חולצות הטי שכולם רוצים בקיץ!
                        </p>
                        <Link to="/shop?stock=true&category=T-Shirts" className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white">Shop Now</Link>
                    </div>
                </div>
                <div className="heroo3-content text-center">
                </div>
                <div className="flex items-center justify-center flex-1">
                    <div className="max-w-xl text-center">
                        <h1 className="text-6xl font-bold max-md:text-4xl text-accent-content">Pants</h1>
                        <p className="py-6 text-2xl max-md:text-lg text-accent-content">
                            חולצות הטי שכולם רוצים בקיץ!
                        </p>
                        <Link to="/shop?stock=true&category=Shirts" className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white">Shop Now</Link>
                    </div>
                </div>
            </div>


        </div>



    )
}

export default Herooo