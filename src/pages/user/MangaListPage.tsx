import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser";
import SortButton from "../../components/User/Common/SortButton";
import { useEffect, useState } from "react";
import { Manga } from "../../constrants/type";
import apiHandler from "../../apis/apiHandler";
import { ENDPOINTS } from "../../constrants/webInfo";
import MangaCard from "../../components/User/Manga/MangaCard";
import Loader from "../../components/User/Common/Loader";
import BreadCrumb from "../../components/User/Common/BreadCrumb";
import { useParams } from "react-router-dom";

const breadCrumbItems = [
    { label: 'Trang chủ', href: '/', icon: <i className="fa-solid fa-house"></i> },
];

const MangaListPage = () => {
    const [mangaList, setMangaList] = useState<Manga[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { genreId } = useParams<{ genreId: string }>();
    const [sortType, setSortType] = useState('');

    const limit = 24; // Items per page

    // Fetch manga list based on current page
    useEffect(() => {
        const fetchMangaList = async () => {
            try {
                setLoading(true);
                const genreQuery = genreId ? `&fillterGenre=${genreId}` : '';
                const result = await apiHandler.execute(
                    ENDPOINTS.MANGA_ENPOINT,
                    `get-all?page=${currentPage}&limit=${limit}&sortType=${sortType}${genreQuery}`,
                    null,
                    "get"
                );
                setMangaList(result.data.docs);
                setTotalPages(result.data.totalPages); // Assuming API returns total pages
            } catch (err) {
                console.log(err);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchMangaList();
    }, [currentPage, sortType]);

    // Pagination controls
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSortChange = (type: string) => {
        setSortType(type);
        setCurrentPage(1);
    };

    return (
        <DefaultLayoutUser>
            <BreadCrumb items={breadCrumbItems} />
            <div className="min-h-screen">
                <SortButton onSortChange={handleSortChange}/>
                <div>
                    <h1 className="mb-4 text-lg font-bold">Danh sách truyện:</h1>
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            <div className="grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-1 gap-x-4 gap-y-12">
                                {mangaList.map((manga: Manga) => (
                                    <MangaCard item={manga} key={manga._id} />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {/* Pagination Controls */}
                            <div className="flex justify-center items-center mt-8 space-x-2">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 mx-1 rounded-lg transition duration-200 ease-in-out ${
                                        currentPage === 1
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                                >
                                    Previous
                                </button>
                                <span className="flex items-center space-x-2">
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={`px-3 py-1 rounded-full transition duration-200 ease-in-out ${
                                                currentPage === index + 1
                                                    ? 'bg-blue-600 text-white font-semibold'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 mx-1 rounded-lg transition duration-200 ease-in-out ${
                                        currentPage === totalPages
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </DefaultLayoutUser>
    );
};


export default MangaListPage;
