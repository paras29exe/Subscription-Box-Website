import React from 'react';
import Lottie from 'lottie-react';
import authAnimation from "../../assets/Auth-animation.json"
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div className="flex flex-grow overflow-x-hidden flex-col lg:flex-row">
            {/* Left side - Branding/Image */}
            <div className="lg:w-1/2 relative hidden lg:flex flex-col gap-y-16 items-center justify-center p-4 borderr">

                {/* <div className="relative text-center">
                    <h1 className="text-5xl font-extrabold mb-2 drop-shadow-lg bg-gradient-to-br from-blue-600 to-gray-300 text-transparent bg-clip-text">GetMeABox</h1>
                    <p className="text-xl text-gray-700 dark:text-gray-400 ">Discover Curated Surprises Every Month</p>
                </div> */}
                <Lottie
                    animationData={authAnimation}
                    className='w-full '
                />
            </div>

{/* visible only on phone */}
            <Lottie
                    animationData={authAnimation}
                    className='w-screen hidden max-md2:inline-block absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 z-[-1] '
                />


            {/* Right side - Authentication Form */}
            <div className="w-full max-md2:flex-grow lg:w-1/2 flex justify-center items-center max-md2:bg-black/75 max-md2:backdrop-blur-[3px] ">
                <div className='w-full p-4 lg:p-0 sm:w-3/5 flex flex-col gap-y-20'>
                    <div className='mt-4 text-center sm:text-left text-nowrap'>
                        {pathname.includes("signup")
                            ? <div>
                                <h1 className='text-4xl sm:text-5xl font-semibold bg-gradient-to-br from-blue-600 to-gray-300 text-transparent bg-clip-text'>Get Started</h1>
                                <p className='dark:text-gray-400 sm:text-base text-sm text-gray-600'>Welcome to GetMeAbox - Lets Create your Account.</p>
                                {/* <NavLink 
                                to={"/login"}
                                className="text-sm block text-right text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                 >Already have Account? Login</NavLink> */}
                            </div>
                            : <>
                                <h1 className='text-4xl sm:text-5xl font-semibold bg-gradient-to-br from-blue-600 to-gray-300 text-transparent bg-clip-text'>Welcome Back!</h1>
                                <p className='dark:text-gray-400 text-gray-600'>Get back to your Account.</p>
                            </>
                        }
                    </div>
                    <Outlet />
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;
