import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SearchBar from "./SearchBar"

export default function NavigationBar() {
    return (
        <>
            <div className="hidden lg:flex items-center gap-12">
                <a className="font-medium hover:scale-[110%] hover:border-b-2" href="home">Trang chủ</a>
                <a className="font-medium hover:scale-[110%] hover:border-b-2" href="manga">Truyện mới</a>
                <a className="font-medium hover:scale-[110%] hover:border-b-2" href="ranking">Xếp hạng</a>
                <a className="font-medium hover:scale-[110%] hover:border-b-2" href="#" id="genre-dropdown-button" data-dropdown-toggle="genre-dropdown">
                    Thể loại <FontAwesomeIcon icon={faCaretDown} />
                </a>
                <div className="flex items-stretch gap-4">
                    <SearchBar />
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
                                px-2.5
                                dark:bg-gray-800 
                                dark:hover:bg-gray-700 
                                dark:focus:ring-gray-700 
                                dark:border-gray-700
                            ">
                            Đăng nhập
                    </button>
                </div>
                <div id="genre-dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                    </li>
                    </ul>
                </div>
            </div>
            <div className="flex lg:hidden flex-wrap items-center justify-center p-4">
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-1 mx-2 w-10 h-10 justify-center text-sm rounded-lg lg:hidden hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-200 text-white" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-32 h-32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full block sm:hidden sm:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 sm:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                    <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                    </li>
                    <li>
                    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
                    </li>
                    <li>
                    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
                    </li>
                    <li>
                    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
                    </li>
                    <li>
                    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                    </li>
                </ul>
                </div>
            </div>
        </>
    )
}