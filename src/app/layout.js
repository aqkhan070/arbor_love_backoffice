import {Inter} from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";


const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Arbor Love - Back Office",
    description: "The back office for the Arbor Love team",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    );
}
