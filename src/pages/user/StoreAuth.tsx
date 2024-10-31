import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StoreAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Get the query parameters from the URL
        const queryParams = new URLSearchParams(window.location.search);
        const userParam = queryParams.get("user");

        if (userParam) {
            try {
                // Parse the user parameter
                const user = JSON.parse(decodeURIComponent(userParam));
                
                // Extract the necessary fields
                const { email, thumbnail } = user;

                // Store in localStorage
                localStorage.setItem("userEmail", email);
                localStorage.setItem("userAvatar", thumbnail);

            } catch (error) {
                console.error("Failed to parse user data:", error);
            }
        }
        
        navigate("/home");
    }, [navigate]);

    return null; // No UI needed for this component
};

export default StoreAuth;
