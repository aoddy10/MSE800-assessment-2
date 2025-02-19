import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-xl text-gray-600 mt-4">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Go to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
