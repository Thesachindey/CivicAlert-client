import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
    const tabs = ["Story", "Mission", "Impact", "Team & System"];
    const [active, setActive] = React.useState("Story");

    const content = {
        Story: (
            <div className="space-y-4">
                <p>
                    This platform was created to solve a common problem: public issues often go unnoticed or unresolved
                    due to lack of proper reporting and follow-up. Citizens face broken roads, damaged streetlights,
                    water leaks, and other infrastructure problems every day.
                </p>
                <p>
                    Our system provides a simple and transparent way for citizens to report these issues directly to
                    the responsible authorities, ensuring problems are documented and tracked properly.
                </p>
                <p>
                    By combining technology with civic responsibility, we aim to bridge the gap between the public
                    and service providers.
                </p>
            </div>
        ),

        Mission: (
            <p className="text-base md:text-lg leading-relaxed">
                Our mission is to create a reliable digital platform that empowers citizens to report public
                infrastructure issues easily and efficiently. We focus on transparency, accountability, and
                faster resolution by allowing real-time issue submission, status tracking, and community engagement.
                Through this system, we aim to improve communication between citizens and authorities and support
                better public service management.
            </p>
        ),

        Impact: (
            <p className="text-base md:text-lg leading-relaxed">
                This platform helps reduce response time by organizing reported issues in a structured manner.
                Authorities can prioritize critical problems, while citizens can track progress and support issues
                through upvotes. Over time, this leads to improved infrastructure maintenance, safer public spaces,
                and stronger community involvement.
            </p>
        ),

        "Team & System": (
            <p className="text-base md:text-lg leading-relaxed">
                The system is designed with clear role-based access. Citizens can submit and upvote issues, while
                authorized personnel can review, update status, and take action. The platform emphasizes simplicity,
                security, and scalability to support growing user participation and long-term usability.
            </p>
        ),
    };

    return (
        <div className="p-6 lg:p-12 bg-base-200 text-base-content rounded-3xl shadow mt-10">
            <title>About Us</title>
            <h1 className="text-4xl font-bold mb-3">About Us</h1>
            <p className="text-sm mb-8 text-gray-600">
                A digital platform that enables citizens to report public infrastructure issues, track progress,
                and support transparent governance.
            </p>

            <div className="border-t-2 border-dashed border-secondary/40 mb-8"></div>

            <div className="tabs tabs-bordered mb-6">
                {tabs.map((tab) => (
                    <a
                        key={tab}
                        className={`tab ${active === tab ? "tab-active" : ""} text-xl`}
                        onClick={() => setActive(tab)}
                    >
                        {tab}
                    </a>
                ))}
            </div>

            <motion.div
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="min-h-[150px]"
            >
                {content[active]}
            </motion.div>
        </div>
    );
}
