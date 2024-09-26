import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function NavigationBar() {
    return (
        <div className="hidden lg:flex items-center gap-12">
            <a className="font-medium" href="home">Trang chủ</a>
            <a className="font-medium" href="news">Truyện mới</a>
            <a className="font-medium" href="ranking">Xếp hạng</a>
            <a className="font-medium" href="#" id="genre-dropdown-button" data-dropdown-toggle="genre-dropdown">
                Thể loại <FontAwesomeIcon icon={faCaretDown} />
            </a>
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
    )
}