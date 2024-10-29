import { useEffect, useState } from "react"
import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser"
import apiHandler from "../../apis/apiHandler"
import { Chapter, Manga } from "../../constrants/type"
import { ENDPOINTS } from "../../constrants/webInfo"
import { useParams } from "react-router-dom"
import Loader from "../../components/User/Common/Loader"
import BreadCrumb from "../../components/User/Common/BreadCrumb"
import { formatISODate } from "../../utils/FormatDate"


const MangaDetailPage = () => {
    
    const { id } = useParams<{ id: string }>();
    
    const [manga, setManga] = useState<Manga>()

    const [chapters, setChapters] = useState<Chapter[]>()
    
    const [loading, setLoading] = useState(false)
    
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
                setLoading(false)
            } catch(err) {
                console.log(err)
            }
        }

        fetchMangaDetail()
    }, [])

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
                                    <img className="min-w-[300px]" src={manga?.imageUrl} alt="cover image" />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-3xl font-bold mb-4">{manga?.name}</h2>
                                    <p className="font-bold">Mô tả:</p>
                                    <p className="font-thin mb-4">{manga?.summary}</p>
                                    {/* <p className="font-bold mb-4">Thể loại:</p>
                                    <div className="w-full">
                                        {manga?.genres.map((genre) => (<span className="mx-2 p-2 border border-white rounded-md">{genre.name}</span>))}
                                    </div> */}
                                    <div className="flex gap-10 mb-4">
                                        <div>
                                            <p className="font-bold">Chapters</p>
                                            <p className="font-thin">16</p>
                                        </div>
                                        <div>
                                            <p className="font-bold">Lượt xem</p>
                                            <p className="font-thin">1.8k</p>
                                        </div>
                                        <div>
                                            <p className="font-bold">Lượt đánh giá</p>
                                            <p className="font-thin">16</p>
                                        </div>
                                        <div>
                                            <p className="font-bold">Trạng thái</p>
                                            <p className="font-thin">Đang phát hành</p>
                                        </div>
                                    </div>
                                    <p className="font-bold mb-2">Tác giả: <span className="font-thin mx-2">{manga?.author.map((author) => (author.name))}</span></p>
                                    <p className="font-bold mb-2">Nhà xuất bản: <span className="font-thin mx-2">{manga?.publisher.name}</span></p>
                                    <p className="font-bold mb-2">Ngày xuất bản: <span className="font-thin mx-2">{manga && formatISODate(manga?.publish_date.toString())}</span></p>
                                    {/* Chapter List in Table */}
                                    <div className="mt-8">
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
                                                                    <a href={`/manga/${manga?._id}/chapter/${chapter?._id}`} className="text-blue-400 hover:underline">
                                                                        {chapter.title}
                                                                    </a>
                                                                </td>
                                                                <td className="py-3 px-6 text-gray-300">{formatISODate(chapter?.createdAt.toString())}</td>
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
                        </>
                    )
                }
            </div>
        </DefaultLayoutUser>
    )
}

export default MangaDetailPage