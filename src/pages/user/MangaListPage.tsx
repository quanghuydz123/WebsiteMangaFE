import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser";
import MangaList from "../../components/User/Manga/MangaList";
import SortButton from "../../components/User/Common/SortButton";

const MangaListPage = () => {
    return (
        <DefaultLayoutUser>
            <div>
                <SortButton />
                <MangaList />
            </div>
        </DefaultLayoutUser>
    );
}

export default MangaListPage;
