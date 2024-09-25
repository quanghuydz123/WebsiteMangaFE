import MangaCard from "./MangaCard";

export default function MangaList() {
    return (
        <>
            <h1 className="mb-4 text-lg font-bold">Danh sách truyện:</h1>
            <div className="grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-1 gap-x-4 gap-y-12">
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