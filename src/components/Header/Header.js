import React from "react";
import Image from "next/image";
import logo from '../../assets/logo.svg'

export default function Header() {
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        window.location.reload();
    };

    return(
        <>
        <div className="pt-10 pl-10 bg-transparent flex justify-between items-center">
            <Image src={logo} alt="logo" />
            <button
                onClick={handleLogout}
                className="mr-10 bg-darkgreen hover:bg-lightgreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Logout
            </button>
        </div>
        </>
    )
}