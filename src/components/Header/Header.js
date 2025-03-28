import React from "react";
import Image from "next/image";
import logo from '../../assets/logo.svg'

export default function Header() {
    return(
        <>
        <div className="pt-10 pl-10 bg-transparent">
            <Image src={logo} alt="logo" />
        </div>
        </>
    )
}