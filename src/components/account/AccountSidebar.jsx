import { useEffect, useState } from "react";
import { Loader, LoaderCircle, LogOut, Menu, X } from "lucide-react";
import { account } from "../../appwriteAuth/appwrite.config";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/asyncThunk/authThunk";
import { Navigate, useNavigate } from "react-router-dom";


const AccountSidebar = ({ activeTab, setActiveTab }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const { userData, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    const tabs = [
        { id: "profile", label: "Profile" },
        { id: "shipping", label: "Shipping Addresses" },
        { id: "subscriptions", label: "Active Subscriptions" },
        { id: "payments", label: "Payment History" },
    ];

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap()
            navigate("/")
        } catch (error) {
            console.error("Logout Error: ", error)
        }
    };


    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden md:block bg-black/30 w-full backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-2 md2:p-5">
                <ul>
                    {tabs.map((tab) => (
                        <li key={tab.id} className="mb-2">
                            <button
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full text-left md:text-base text-sm px-4 py-3 rounded-lg transition-all font-medium ${activeTab === tab.id
                                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
                                    : "hover:bg-white/10 text-gray-300"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="border-t border-white/10 pt-1">
                    <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="flex items-center w-full text-left px-4 py-3 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                        {loading ?
                            <LoaderCircle className="animate-spin mx-auto" size={24} />
                            :
                            <>
                                <LogOut className="mr-2 h-5 w-5" />
                                Logout
                            </>
                        }
                    </button>
                </div>
            </div>

            {/* Mobile Top Bar (Menu + Logout) */}
            <div className="md:hidden flex items-center justify-between px-4 py-2">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 text-white hover:text-pink-400 transition-all"
                >
                    <Menu size={22} />
                    <span>Menu</span>
                </button>

                <div className="">
                    <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="flex items-center w-full text-left px-4 py-3 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                        {loading ?
                            <LoaderCircle className="animate-spin mx-auto" size={24} />
                            :
                            <>
                                <LogOut className="mr-2 h-5 w-5" />
                                Logout
                            </>
                        }
                    </button>
                </div>
            </div>


            {/* Mobile Sidebar (Drawer with Transition) */}
            <div
                className={`fixed inset-0 z-50 flex transition-all ease-in-out duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />

                {/* Sidebar with Slide-in Transition */}
                <div
                    className={`relative bg-black/40 w-4/5 max-w-sm h-full backdrop-blur-lg border-r border-white/20 p-6 shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 text-gray-300 hover:text-white"
                    >
                        <X size={24} />
                    </button>

                    <ul className="mt-8">
                        {tabs.map((tab) => (
                            <li key={tab.id} className="mb-2">
                                <button
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left text-base px-4 py-3 rounded-lg transition-all font-medium ${activeTab === tab.id
                                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
                                        : "hover:bg-white/10 text-gray-300"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default AccountSidebar;
