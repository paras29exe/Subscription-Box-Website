import React from 'react';
import Lottie from 'lottie-react';
import authAnimation from "../../assets/Auth-animation.json"
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const AuthLayout = ({children}) => {
    const {pathname} = useLocation();

    return (
        <div className="flex flex-grow overflow-x-hidden flex-col lg:flex-row">
            {/* Left side - Branding/Image */}
            <div className="lg:w-1/2 relative hidden lg:flex flex-col gap-y-16 items-center justify-center p-4 borderr">

                <Lottie
                    animationData={authAnimation}
                    className='w-full '
                />
            </div>

            {/* visible only on phone */}
            <Lottie
                animationData={authAnimation}
                className='w-screen hidden max-lg:inline-block absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 z-[-1] '
            />

            {/* Right side - Authentication Form */}
            <div className="w-full flex-grow lg:flex-grow-0 lg:w-1/2 flex justify-center items-center max-lg:dark:bg-black/65 max-lg:bg-white/65 max-lg:backdrop-blur-[3px] ">
                <div className='w-full p-4  md:w-3/4 xl:w-3/5 lg:p-0 flex flex-col gap-y-20'>
                    <div className='mt-4 text-center sm:text-left text-nowrap'>
                        {pathname.includes("signup")
                            ? <div>
                                <h1 className='text-4xl sm:text-5xl font-semibold bg-gradient-to-br from-blue-600 to-gray-300 text-transparent bg-clip-text'>Get Started</h1>
                                <p className='dark:text-gray-400 sm:text-base text-sm text-gray-800'>Welcome to GetMeAbox - Lets Create your Account.</p>
                                {/* <NavLink 
                                to={"/login"}
                                className="text-sm block text-right text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                 >Already have Account? Login</NavLink> */}
                            </div>
                            : <>
                                <h1 className='text-4xl sm:text-5xl font-semibold bg-gradient-to-br from-blue-600 to-gray-300 text-transparent bg-clip-text'>Welcome Back!</h1>
                                <p className='dark:text-gray-400 text-gray-800'>Get back to your Account.</p>
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
