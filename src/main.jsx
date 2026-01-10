import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import { router } from "./routes/Router.jsx";

import AuthProvider from "./context/AuthProvider.jsx";

import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";

const queryClient = new QueryClient();

/* -------------------- APP WRAPPER -------------------- */

const AppWrapper = ({ children }) => {
  const [isInitializing, setIsInitializing] = useState(true);

  /* ---- Smooth Scroll (Lenis) ---- */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t) => t, // IMPORTANT: keep linear for performance
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  /* ---- Loader Timer ---- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  /* ---- Disable Scroll During Loader ---- */
  useEffect(() => {
    document.body.style.overflow = isInitializing ? "hidden" : "auto";
  }, [isInitializing]);

  return (
    <>
      {/* -------- Loader -------- */}
      <AnimatePresence>
        {isInitializing && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#041a00]"
          >
            {/* Progress Line */}
            <div className="w-48 h-[1px] bg-[#08cb00]/20 relative overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.3,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-[#08cb00] shadow-[0_0_12px_#08cb00]"
              />
            </div>

            {/* Text */}
            <motion.p
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-6 text-[#08cb00] font-mono text-[10px] tracking-[0.4em] uppercase"
            >
              System Initializing
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------- App Content -------- */}
      {!isInitializing && children}
    </>
  );
};

/* -------------------- ROOT -------------------- */

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppWrapper>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </AppWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </AuthProvider>
  </QueryClientProvider>
);
