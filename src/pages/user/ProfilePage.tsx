import { useEffect, useState } from "react";
import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser";

export default function ProfilePage() {
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        // Fetch user details from localStorage
        setUserAvatar(localStorage.getItem("userAvatar"));
        setUsername(localStorage.getItem("userEmail"));
    }, []);

    return (
        <DefaultLayoutUser>
            <div className="flex flex-col items-center p-8 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Thông tin tài khoản</h1>
                
                {/* Profile Card */}
                <div className="rounded-lg shadow-lg p-8 w-full max-w-sm text-center">
                    {userAvatar && (
                        <img 
                            src={userAvatar} 
                            alt="User Avatar" 
                            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200 shadow-md"
                        />
                    )}
                    <h2 className="text-2xl font-semibold mb-2">{username}</h2>
                    <p className="text-gray-500">Welcome to your profile page!</p>
                </div>
            </div>
        </DefaultLayoutUser>
    );
}
