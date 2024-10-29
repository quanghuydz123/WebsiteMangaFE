import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SearchBar from "./SearchBar"
import { useEffect, useState } from "react";
import apiHandler from "../../../apis/apiHandler";
import { ENDPOINTS } from "../../../constrants/webInfo";
import { Genre } from "../../../constrants/type";

export default function NavigationBar() {

    const [genres, setGenres] = useState<Genre[]>([]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const limit = 999; // Items per page

    // Fetch manga list based on current page
    useEffect(() => {
        const fetchGenreList = async () => {
            try {
                const result = await apiHandler.execute(
                    ENDPOINTS.GENRE_ENDPOINT,
                    `get-page?limit=${limit}`,
                    null,
                    "get"
                );
                setGenres(result.data.genres);
            } catch (err) {
                console.log(err);
            }
        };

        fetchGenreList();
    }, []);

    return (
        <>
            <div className="hidden lg:flex items-center gap-12">
                <a className="font-medium hover:scale-[110%] hover:border-b-2" href="/home">Trang chủ</a>
                {/* Dropdown */}
                <a 
                    className="font-medium hover:scale-[110%] relative"
                    href="#"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    Thể loại <FontAwesomeIcon icon={faCaretDown} />
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute z-10 top-6 bg-slate-800 divide-y divide-gray-100 rounded-lg shadow w-64 max-h-80 overflow-y-scroll">
                            <ul className="py-2 text-lg"> {/* Tăng kích thước font chữ */}
                                {genres.map((genre) => (
                                    <li key={genre._id}>
                                        <a 
                                            href={`/genres/${genre._id}`} 
                                            className="block px-4 py-3 text-white hover:bg-gray-100 hover:text-slate-800 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            {genre.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
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
            </div>
        </>
    )
}