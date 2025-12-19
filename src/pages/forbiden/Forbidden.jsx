import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <title>Forbidden</title>
      <div className="max-w-md w-full bg-base-100 rounded-2xl shadow-lg p-8 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <FaLock className="text-6xl text-error" />
        </div>

        {/* Code */}
        <h1 className="text-4xl font-bold text-error">403 – Access Denied</h1>

        {/* Message */}
        <p className="mt-4 text-lg font-semibold text-base-content">
          You are not allowed to access this section
        </p>

        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          This page is restricted to authorized users only.  
          If you believe this is a mistake, please sign in with the correct account
          or return to the main dashboard.
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/" className="btn btn-outline">
            Home
          </Link>

          <Link to="/login" className="btn btn-primary text-white">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
