import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <Link to='/' className="text-xl font-semibold">FAQ Dashboard</Link>
            <div className="space-x-4">
                <Link to="/create" className="bg-white text-blue-500 px-4 py-2 rounded-md">
                    Create FAQ
                </Link>
                <Link to="/view" className="bg-white text-blue-500 px-4 py-2 rounded-md">
                    View FAQs
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
