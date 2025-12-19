import React, { useContext, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { BiLogOutCircle, BiCrown, BiShieldQuarter } from "react-icons/bi";
import { FaUserEdit, FaSpinner, FaStar, FaUserShield, FaUserTie } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyProfilePage = () => {
  const { user, logOut } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loadingPay, setLoadingPay] = useState(false);


  const { data: dbUser = {}, refetch } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    }
  });

  const handleSubscribe = async () => {
    setLoadingPay(true);
    try {
      const paymentInfo = {
        amount: 1000,
        currency: 'bdt',
        paymentType: 'subscription',
        customerEmail: user.email,
        customerName: user.displayName || 'Citizen',
      };

      const { data } = await axiosSecure.post('/create-checkout-session', paymentInfo);

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Payment Error", "Could not connect to Stripe.", "error");
      setLoadingPay(false);
    }
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
      }
    });
  };

  //ring color for dif roles
  const getRingColor = () => {
    if (dbUser.role === 'admin') return 'ring-error';
    if (dbUser.role === 'staff') return 'ring-info';
    if (dbUser.isPremium) return 'ring-amber-400';
    return 'ring-primary';
  };

  return (
    <div className="py-2 px-2">
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 relative overflow-hidden rounded-3xl">
        <title>My Profile | Civic Alert</title>

        {/* Glow Effects */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />

        <div className="card bg-base-100/90 backdrop-blur-md w-full max-w-md shadow-2xl border border-white/20 z-10">
          <div className="card-body items-center text-center space-y-4">

            {/* avatar */}
            <div className="avatar relative">
              <div className={`w-32 rounded-full ring ring-offset-2 ring-offset-base-100 ${getRingColor()}`}>
                <img
                  src={user?.photoURL || "https://i.ibb.co/Zm9J5M4/user-placeholder.png"}
                  alt="Profile"
                  className="object-cover"
                />
              </div>

              {/* Icons based on Role */}
              {dbUser.role === 'admin' && (
                <div className="absolute -top-3 -right-3 bg-error text-white p-2 rounded-full shadow-lg border-2 border-white">
                  <FaUserShield size={20} />
                </div>
              )}
              {dbUser.role === 'staff' && (
                <div className="absolute -top-3 -right-3 bg-info text-white p-2 rounded-full shadow-lg border-2 border-white">
                  <FaUserTie size={20} />
                </div>
              )}
              {dbUser.isPremium && dbUser.role === 'citizen' && (
                <div className="absolute -top-3 -right-3 bg-amber-400 text-white p-2 rounded-full shadow-lg border-2 border-white animate-bounce">
                  <BiCrown size={24} />
                </div>
              )}
            </div>


            <div className="space-y-1">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                {user?.displayName || "User"}
              </h2>
              <p className="text-sm font-medium opacity-60">{user?.email}</p>
            </div>

            {/* role based badge */}
            <div className="w-full py-2">

              {/* for admin*/}
              {dbUser.role === 'admin' && (
                <div className="bg-error text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
                  <FaUserShield />
                  <span className="logo-font">ADMINISTRATOR</span>
                </div>
              )}

              {/* for staff*/}
              {dbUser.role === 'staff' && (
                <div className="bg-info text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
                  <FaUserTie />
                  <span>STAFF MEMBER</span>
                </div>
              )}

              {/* for normal and premium citizens */}
              {dbUser.role === 'citizen' && (
                <>
                  {dbUser.isPremium ? (
                    <div className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transform hover:scale-105 transition-transform cursor-default">
                      <FaStar className="text-yellow-100 animate-spin-slow" />
                      <span>PREMIUM CITIZEN</span>
                      <FaStar className="text-yellow-100 animate-spin-slow" />
                    </div>
                  ) : (
                    <div className="badge badge-lg badge-outline badge-neutral w-full p-4 opacity-70">
                      Citizen Account
                    </div>
                  )}
                </>
              )}
            </div>


            {dbUser.role === 'citizen' && !dbUser.isPremium && (
              <div className="w-full bg-base-200/50 p-5 rounded-xl border border-primary/20 hover:border-primary transition-colors">
                <h3 className="font-bold text-lg mb-1 flex items-center justify-center gap-2 text-primary">
                  <BiCrown /> Become a VIP
                </h3>
                <p className="text-xs opacity-70 mb-4">
                  Get priority support, unlimited reports, and a verified badge.
                </p>

                <button
                  onClick={handleSubscribe}
                  disabled={loadingPay}
                  className="btn btn-primary w-full shadow-lg text-white"
                >
                  {loadingPay ? (
                    <span className="flex items-center gap-2">
                      <FaSpinner className="animate-spin" /> Processing...
                    </span>
                  ) : (
                    "Subscribe for 1000 Tk"
                  )}
                </button>
              </div>
            )}

            <div className="divider my-2"></div>


            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Link
                to="/auth/update-profile"
                className="btn flex-1 btn-secondary btn-outline"
              >
                <FaUserEdit /> Edit Profile
              </Link>

              <button
                onClick={handleLogOut}
                className="btn flex-1 btn-outline btn-primary"
              >
                <BiLogOutCircle size={20} /> Logout
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;