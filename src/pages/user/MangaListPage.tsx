import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser";
// import MangaList from "../../components/User/Manga/MangaList";
import SortButton from "../../components/User/Common/SortButton";
import { useEffect, useState } from "react";
import { Manga } from "../../constrants/type";
import apiHandler from "../../apis/apiHandler";
import { ENDPOINTS } from "../../constrants/webInfo";
import MangaCard from "../../components/User/Manga/MangaCard";
import Loader from "../../components/User/Common/Loader";
import BreadCrumb from "../../components/User/Common/BreadCrumb";

const breadCrumbItems = [
    { label: 'Trang chủ', href: '/', icon: <i className="fa-solid fa-house"></i> },
];

const MangaListPage = () => {

    const [mangaList, setMangaList] = useState<Manga[]>([])

    const [loading, setLoading] = useState(false)

    // Fetch all manga
    useEffect(() => {
        const fetchMangaList = async() => {
            try {
                setLoading(true)
                const result = await apiHandler.execute(ENDPOINTS.MANGA_ENPOINT, 'get-all?limit=24', null, "get")
                setMangaList(result.data.docs)
                setLoading(false)
                console.log("fetch success")
            } catch(err) {
                console.log(err)
            }
        }

        fetchMangaList()
    }, [])

    return (
        <DefaultLayoutUser>
            <BreadCrumb items={breadCrumbItems}/>
            <div className="min-h-screen">
                <SortButton />
                <div>
                    <h1 className="mb-4 text-lg font-bold">Danh sách truyện:</h1>
                    {loading ? (
                        <Loader/>
                    ) : (
                        <div className="grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-1 gap-x-4 gap-y-12">
                            {mangaList.map((manga: Manga) => (
                                <MangaCard item={manga} key={manga._id} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayoutUser>
    );
}

export default MangaListPage;
