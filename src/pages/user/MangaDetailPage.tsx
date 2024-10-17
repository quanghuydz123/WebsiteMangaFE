import { useEffect, useState } from "react"
import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser"
import apiHandler from "../../apis/apiHandler"
import { Manga } from "../../constrants/type"
import { ENDPOINTS } from "../../constrants/webInfo"
import { useParams } from "react-router-dom"

const MangaDetailPage = () => {

    const { mangaId } = useParams<{ mangaId: string }>();

    const [manga, setManga] = useState<Manga>()

    useEffect(() => {
        const fetchMangaDetail = async() => {
            try {
                const result = await apiHandler.execute<{manga: Manga }>(ENDPOINTS.MANGA_ENPOINT, `get-manga-byid?id=${mangaId}`, null, "get")
                setManga(result.manga)
                console.log(result.manga)
            } catch(err) {
                console.log(err)
            }
        }

        fetchMangaDetail()
    }, [])

    return (
        <DefaultLayoutUser>
            <div className="flex gap-10 h-screen">
                {/* Managa Cover Image */}
                <div>
                    <img className="min-w-[300px]" src={manga?.imageUrl} alt="cover image" />
                </div>
                <div className="p-4">
                    <h2 className="text-3xl font-bold mb-4">{manga?.name}</h2>
                    <p className="font-bold">Mô tả:</p>
                    <p className="font-thin mb-4">{manga?.summary}</p>
                    <p className="font-bold mb-4">Thể loại: {manga?.genres.map((genre) => (<span className="mx-2 p-2 border border-white rounded-md">{genre.name}</span>))}</p>
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
                    <p className="font-bold mb-2">Ngày xuất bản: <span className="font-thin mx-2">{manga?.publish_date.toString()}</span></p>
                </div>
            </div>
        </DefaultLayoutUser>
    )
}

export default MangaDetailPage