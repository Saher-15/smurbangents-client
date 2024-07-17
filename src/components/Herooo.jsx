import { Link } from "react-router-dom";
import "../styles/Hero.css";

const Herooo = () => {
    return (
        <div className="topbar border-b border-gray-800">
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="heroo2 bg-base-350 bg-blend-overlay">
                        <div className="heroo2-content text-center py-20">
                            {/* Content for first hero section */}
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="max-w-xl text-center">
                                <h1 className="text-4xl md:text-6xl font-bold text-accent-content text-white">T-Shirts</h1>
                                <p className="py-6 text-lg md:text-2xl text-accent-content text-white">
                                    חולצות הטי שכולם רוצים בקיץ!
                                </p>
                                <Link to="/shop?stock=true&category=T-Shirts" className="btn btn-wide bg-blue-900 hover:bg-blue-700 text-white">קנה עכשיו</Link>
                            </div>
                        </div>
                    </div>
                    <div className="heroo3 bg-base-350 bg-blend-overlay">
                        <div className="heroo3-content text-center py-20">
                            {/* Content for second hero section */}
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="max-w-xl text-center">
                                <h1 className="text-4xl md:text-6xl font-bold text-accent-content text-white">Polo-Shirts</h1>
                                <p className="py-6 text-lg md:text-2xl text-accent-content text-white">
                                    חולצות הטי שכולם רוצים בקיץ!
                                </p>
                                <Link to="/shop?stock=true&category=Shirts" className="btn btn-wide bg-blue-900 hover:bg-blue-700 text-white">קנה עכשיו</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Herooo;
