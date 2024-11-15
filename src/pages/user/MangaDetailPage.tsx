import { useEffect, useState } from "react"
import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser"
import apiHandler from "../../apis/apiHandler"
import { Chapter, Manga } from "../../constrants/type"
import { ENDPOINTS } from "../../constrants/webInfo"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/User/Common/Loader"
import BreadCrumb from "../../components/User/Common/BreadCrumb"
import { formatISODate } from "../../utils/FormatDate"
import { formatNumber } from "../../utils/FormatNumber"
import MangaTag from "../../components/User/Manga/MangaTag"
import CommentSection from "../../components/User/Manga/CommentSession"


const MangaDetailPage = () => {
    
    const { id } = useParams<{ id: string }>();
    
    const [manga, setManga] = useState<Manga>()

    const [chapters, setChapters] = useState<Chapter[]>()
    
    const [loading, setLoading] = useState(false)

    const [rating, setRating] = useState(0);

    const [ratingHover, setRatingHover] = useState(0);

    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const nav = useNavigate()

    const userId = localStorage.getItem("userId")

    const handleFollowClick = async() => {
        try {
            setLoading(true)
            var followingRequest = {
                user: userId,
                manga: id,
            }
            isFollowing ? 
                await apiHandler.execute(ENDPOINTS.FOLLOWING_ENDPOINT, 'unfollow', followingRequest, 'delete') 
                : await apiHandler.execute(ENDPOINTS.FOLLOWING_ENDPOINT, 'create', followingRequest, 'post')
            setIsFollowing((prev) => !prev);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    };

    const handleRatingClick = async (value: number) => {
        setRating(value);
        // Prepare the rating request data
        const RatingRequest = {
            user: userId,
            manga: id,
            star: value, // Use `value` which is the selected rating (from 1 to 5)
        };
    
        try {
            // Send the rating request to the backend
            await apiHandler.execute(ENDPOINTS.RATING_ENDPOINT, 'toggle-rating', RatingRequest, 'post');
        } catch (err) {
            console.log("Error while submitting rating:", err);
        }
    };

    const handleChapterClick = async (chapter: Chapter) => {
        try {
            setLoading(true)
            var addHistoryRequest = {
                idUser: userId,
                idChapter: chapter._id,
            }
            await apiHandler.execute(ENDPOINTS.USER_ENDPOINT, 'add-reading-history', addHistoryRequest, 'post') 
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
        nav(`/manga/${id}/read?chapterNum=${chapter.chapterNum}`)
    }
    
    const breadCrumbItems = [
        { label: 'Trang chủ', href: '/', icon: <i className="fa-solid fa-house"></i> },
        { label: manga ? manga.name : '', href: `/manga/${manga?._id}`, icon: <i className="fa-solid fa-book-open-reader"></i>},
    ];

    useEffect(() => {
        const fetchMangaDetail = async() => {
            try {
                setLoading(true)
                var result = await apiHandler.execute(ENDPOINTS.MANGA_ENPOINT, `get-manga-byid?id=${id}`, null, "get")
                setManga(result.data)
                result = await apiHandler.execute(ENDPOINTS.CHAPTER_ENDPOINT, `get-page?mangaId=${id}&limit=10&orderType=DESC`, null, 'get')
                setChapters(result.data.chapters)
                result = await apiHandler.execute(ENDPOINTS.FOLLOWING_ENDPOINT, `check-isFollow?idManga=${id}&idUser=${userId}`)
                setIsFollowing(result.data)
            } catch(err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchMangaDetail()
    }, [id])

    return (
        <DefaultLayoutUser>
            <div className="min-h-screen">
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <>
                            <BreadCrumb items={breadCrumbItems}/>
                            <div className="flex gap-10 min-h-screen">
                                {/* Managa Cover Image */}
                                <div>
                                    <img className="min-w-[300px] max-w-[400px]" src={manga?.imageUrl} alt="cover image" />
                                </div>
                                <div className="p-4 w-full">
                                    <h2 className="text-3xl font-bold mb-4">{manga?.name}</h2>
                                    <p className="font-bold">Mô tả:</p>
                                    <p className="font-thin mb-4">{manga?.summary}</p>
                                    {/* Manga Genres (Tags) */}
                                    <p className="font-bold mb-4">Thể loại:</p>
                                    <div className="flex mb-4 gap-3 flex-wrap w-full">
                                        {manga?.genres.map((genre) => (
                                        <span key={genre.name} className="mb-2 p-2 bg-blue-500 font-bold text-white rounded-md cursor-pointer" onClick={() => nav(`/genres/${genre._id}`)}>
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                    {/* Details */}
                                    <div className="flex gap-10 mb-4">
                                        <div>
                                            <p className="font-bold mb-1">Chapters</p>
                                            <p className="font-thin">{chapters?.length}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold mb-1">Lượt xem</p>
                                            <p className="font-thin">{formatNumber(manga?.views)}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold mb-1">đánh giá trung bình</p>
                                            <div className="flex items-center">
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <i
                                                        key={index}
                                                        className={`fa-solid fa-star ${index < (manga?.rating || 0) ? 'text-yellow-500' : 'text-gray-400'}`}
                                                    ></i>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold mb-1">Trạng thái</p>
                                            <MangaTag status={manga?.status} />
                                            {/* <p className="font-thin">MangaTag{manga?.status}</p> */}
                                        </div>
                                    </div>
                                    <p className="font-bold mb-2">Tác giả: <span className="font-thin mx-2">{manga?.author.map((author) => (author.name))}</span></p>
                                    <p className="font-bold mb-2">Nhà xuất bản: <span className="font-thin mx-2">{manga?.publisher.name}</span></p>
                                    <p className="font-bold mb-4">Ngày xuất bản: <span className="font-thin mx-2">{manga && formatISODate(manga?.publish_date.toString())}</span></p>
                                    {/* Rating & Following button */}
                                    <button
                                        onClick={handleFollowClick}
                                        className={`px-4 py-2 rounded-md font-semibold ${
                                            !isFollowing ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'
                                        }`}
                                    >
                                        {isFollowing ? "Hủy theo dõi" : "Theo dõi ngay"}
                                    </button>
                                    <div>
                                        <p className="font-bold my-4 text-2xl text-blue-500">Đánh giá của bạn</p>
                                        <div className="flex items-center">
                                            {Array.from({ length: 5 }, (_, index) => {
                                                const starValue = index + 1;
                                                return (
                                                    <i
                                                        key={index}
                                                        className={`fa-solid fa-star text-2xl ${
                                                            starValue <= (ratingHover || rating) ? 'text-yellow-500' : 'text-gray-400'
                                                        } cursor-pointer`}
                                                        onClick={() => handleRatingClick(starValue)}
                                                        onMouseEnter={() => setRatingHover(starValue)}
                                                        onMouseLeave={() => setRatingHover(0)}
                                                    ></i>
                                                );
                                            })}
                                            <span className="ml-2 text-gray-300 font-thin">
                                                {rating > 0 ? `${rating} / 5` : "Bạn chưa đánh giá truyện này"}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Chapter List in Table */}
                                    <div className="mt-8 w-full">
                                        <h3 className="text-2xl font-bold mb-4 text-white">Danh sách tập</h3>
                                        {chapters?.length ? (
                                            <div className="overflow-x-auto">
                                                <table className="w-full bg-gray-800 border border-gray-600">
                                                    <thead className="bg-gray-700">
                                                        <tr>
                                                            <th className="py-3 px-2 text-left font-semibold text-white">Số chương</th>
                                                            <th className="py-3 px-6 text-left font-semibold text-white">Tên tập</th>
                                                            <th className="py-3 px-6 text-left font-semibold text-white">Ngày xuất bản</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {chapters.map((chapter, index) => (
                                                            <tr key={chapter?._id} className="border-b border-gray-600 hover:bg-gray-700">
                                                                <td className="py-3 px-6 text-gray-300">#{chapters.length - index}</td>
                                                                <td className="py-3 px-6">
                                                                    <p onClick={() => handleChapterClick(chapter)} className="text-blue-400 hover:underline cursor-pointer">
                                                                        {chapter.title}
                                                                    </p>
                                                                </td>
                                                                <td className="py-3 px-6 text-gray-300">{formatISODate(chapter?.createdAt)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p className="text-gray-300">Không có tập nào được tìm thấy.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <CommentSection mangaId={id} />
                        </>
                    )
                }
            </div>
        </DefaultLayoutUser>
    )
}

export default MangaDetailPage