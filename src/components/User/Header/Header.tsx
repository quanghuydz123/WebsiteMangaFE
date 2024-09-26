import NavigationBar from "./NavigationBar";
import SearchBar from "./SearchBar";
import Logo from "../../../assets/images/logo.png"

export default function Header() {
    return (
        <div className="container flex justify-between items-center mx-2 md:mx-auto pt-6 ">
            {/* Logo */}
            <div>
                <img className="w-40 rounded-lg" src={Logo} />
            </div>
            <div className="grow flex justify-evenly">
            {/* Navigation Bar */}
                <NavigationBar />
            {/* Search Bar */}
                <SearchBar />
            </div>
            {/* Login Button */}
            <div>
                <button 
                type="button" 
                className="
                    hidden lg:block
                    border-2
                    border-slate-500
                    bg-gray-800
                    hover:bg-gray-900 
                    focus:outline-none 
                    focus:ring-4 
                    focus:ring-gray-300 
                    font-medium 
                    rounded-lg 
                    px-5 py-2.5
                    dark:bg-gray-800 
                    dark:hover:bg-gray-700 
                    dark:focus:ring-gray-700 
                    dark:border-gray-700">
                    Đăng nhập
                </button>
            </div>
        </div>
    )
}