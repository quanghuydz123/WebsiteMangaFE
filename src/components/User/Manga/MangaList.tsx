import MangaCard from "./MangaCard";

export default function MangaList() {
    return (
        <>
            <h1 className="mb-4 text-lg font-bold">Danh sách truyện:</h1>
            <div className="grid grid-cols-8 gap-x-4 gap-y-12">
                <MangaCard />
                <MangaCard />
                <MangaCard />
                <MangaCard />
                <MangaCard />
                <MangaCard />
                <MangaCard />
                <MangaCard />
                <MangaCard />
            </div>
        </>
    )
}