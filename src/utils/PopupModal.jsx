import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const PopupModal = ({
    isOpen,
    mainText,
    infoText,
    successBtnText,
    cancelBtnText,
    onSuccess,
    onCancel
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Background overlay */}
                    <div className="absolute inset-0 dark:bg-black/50 bg-gray-400/50 backdrop-blur-sm" />

                    {/* Centered modal */}
                    <motion.div
                        initial={{ scale: 0.9, y: 500, opacity: 0 }}
                        animate={{ scale: 1, y:0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative z-50 w-4/5 sm:max-w-md bg-gray-100 shadow-gray-500 dark:shadow-zinc-900 dark:bg-zinc-800 rounded-lg p-6 px-12 shadow-xl"
                    >
                        <h2 className="text-xl font-semibold text-left text-black dark:text-white">
                            {mainText}
                        </h2>
                        <p className="text-sm text-left text-gray-600 dark:text-gray-300 mt-1">
                            {infoText}
                        </p>

                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                            >
                                {cancelBtnText}
                            </button>
                            <button
                                onClick={onSuccess}
                                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition"
                            >
                                {successBtnText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PopupModal;
