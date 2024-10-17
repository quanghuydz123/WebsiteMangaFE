import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser";
// import MangaList from "../../components/User/Manga/MangaList";
import SortButton from "../../components/User/Common/SortButton";
import { useEffect, useState } from "react";
import { Manga } from "../../constrants/type";
import apiHandler from "../../apis/apiHandler";
import { ENDPOINTS } from "../../constrants/webInfo";
import MangaCard from "../../components/User/Manga/MangaCard";

const MangaListPage = () => {

    const [mangaList, setMangaList] = useState<Manga[]>([])

    // Fetch all manga
    useEffect(() => {
        const fetchMangaList = async() => {
            try {
                const result = await apiHandler.execute<{manga: {docs: Manga[]} }>(ENDPOINTS.MANGA_ENPOINT, 'get-all?limit=24', null, "get")
                setMangaList(result.manga.docs)
                console.log(mangaList)
            } catch(err) {
                console.log(err)
            }
        }

        fetchMangaList()
    }, [])

    return (
        <DefaultLayoutUser>
            <div>
                <SortButton />
                <div>
                    <h1 className="mb-4 text-lg font-bold">Danh sách truyện:</h1>
                    <div className="grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-1 gap-x-4 gap-y-12">
                        {mangaList.map((manga: Manga, index) => (
                            <MangaCard item={manga} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </DefaultLayoutUser>
    );
}

export default MangaListPage;
