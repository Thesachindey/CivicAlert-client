import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Github, Heart } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="w-full shadow  text-neutral px-6 py-10 mt-10 bg-base-300 rounded-t-2xl">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between gap-10">

                    {/* Left Section */}
                    <div className="space-y-6 w-full md:w-1/2">
                        <h1 className="text-2xl font-semibold flex items-center gap-2">
                            <Logo />
                        </h1>

                        <p className="text-sm text-base-content/70 max-w-md">
                            Civic Alert is a public infrastructure issue reporting platform that empowers
                            citizens to report, track, and resolve city problems transparently.
                        </p>

                        <ul className="flex flex-wrap gap-6 text-sm">
                            <li className="cursor-pointer hover:underline">About Civic Alert</li>
                            <li className="cursor-pointer hover:underline">How It Works</li>
                            <li className="cursor-pointer hover:underline">All Issues</li>
                            <li className="cursor-pointer hover:underline">Report an Issue</li>
                            <li className="cursor-pointer hover:underline">Dashboard</li>
                        </ul>

                        <div className="space-y-2 text-sm">
                            <p className="font-semibold">Contact & Support</p>
                            <p>Email: support@civicalert.com</p>
                            <p>Phone: +880-1777-000000</p>
                            <p>
                                Address: City Service Office, Dhaka, Bangladesh
                            </p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="flex gap-4 justify-start md:justify-end text-xl">
                            <FaLinkedin className="cursor-pointer hover:text-blue-600" />
                            <FaXTwitter className="cursor-pointer hover:text-sky-500" />
                            <FaFacebook className="cursor-pointer hover:text-blue-600" />
                        </div>

                        <h6 className="footer-title">Stay Informed</h6>

                        <div className="bg-base-200 p-6 rounded-xl flex flex-col gap-4 md:flex-row md:items-center">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full bg-base-100 text-neutral"
                            />
                            <button className="btn btn-primary rounded-lg w-full md:w-auto">
                                Get City Updates
                            </button>
                        </div>

                        <p className="text-xs text-base-content/60">
                            Get updates on resolved issues, city improvements, and platform features.
                        </p>
                    </div>
                </div>

                <hr className="border-base-300 my-8" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral">
                    <p>
                        © 2025 Civic Alert. Building better cities together.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <p className="cursor-pointer hover:underline">Privacy Policy</p>
                        <p className="cursor-pointer hover:underline">Terms & Conditions</p>

                        <a
                            href="https://github.com/thesachindey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 cursor-pointer hover:underline"
                        >
                            Developed by Sachin
                            <Heart size={14} className="text-red-500" />
                            <Github size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
