import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

export const useProtectedPage = () => {
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            console.log("Token nao encontrado. Redirecionando.");
            navigate('/', { replace: true });
        } else {
            setIsVerified(true);
        }
    }, [navigate]);

    return isVerified;
}