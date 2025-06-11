
import { useNavigate } from "react-router-dom";
import { AdminHome } from "./AdminHome"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { MainNav } from "../MainNav";

export const Admin = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY && window.scrollY > 100) { // Scrolling down & past 100px
                    setVisible(false);
                } else { // Scrolling up
                    setVisible(true);
                }
                setLastScrollY(window.scrollY);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            // Cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    return (
        <>
            <MainNav type="admin" />
            <AdminHome />
        </>

    )
}