import React, { useContext } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { BiLogOutCircle } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const MyProfilePage = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your Civic Alert account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, log me out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged Out",
              text: "You have been logged out successfully.",
              icon: "success",
              confirmButtonColor: "#16a34a",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: error.code,
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="py-10">
    <div className="min-h-screen bg-base-200 flex items-center rounded-3xl justify-center p-4">
      <title>My Profile | Civic Alert</title>

      <div className="card bg-base-100 w-full max-w-md shadow-2xl border border-base-300">
        <div className="card-body items-center text-center space-y-4">

          {/* Avatar */}
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-2">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/Zm9J5M4/user-placeholder.png"
                }
                alt="Profile"
              />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">
              {user?.displayName || "Citizen User"}
            </h2>
            <p className="text-sm text-base-content/60">{user?.email}</p>
          </div>

          {/* Role / Status (future-ready) */}
          <div className="badge badge-outline badge-primary">
            Citizen Account
          </div>

          <div className="divider"></div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link
              to="/auth/update-profile"
              className="btn flex-1 bg-primary text-white hover:bg-primary/90"
            >
              <FaUserEdit />
              Update Profile
            </Link>

            <button
              onClick={handleLogOut}
              className="btn flex-1 btn-outline border-red-500 text-red-500 hover:border-red-300 "
            >
              <BiLogOutCircle />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyProfilePage;
