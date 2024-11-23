import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const StoreAuth = () => {

    const { setAuthInfo } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        // Get the query parameters from the URL
        const queryParams = new URLSearchParams(
            location.hash.split('?')[1] || location.search.split('?')[1]
        );
        const userParam = queryParams.get("user");
        const tokenParam = queryParams.get("token");

        if (userParam) {
            try {
                // Parse the user parameter
                const user = JSON.parse(decodeURIComponent(userParam));

                // Extract the necessary fields
                const { _id, email, thumbnail, role } = user;

                // Store in localStorage
                setAuthInfo(_id, email, thumbnail, tokenParam as string, role)
            } catch (error) {
                console.error("Failed to parse user data:", error);
            }
        }

        navigate("/home");
    }, []);

    return null; // No UI needed for this component
};

export default StoreAuth;
