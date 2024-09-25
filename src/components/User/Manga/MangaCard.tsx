import MangaTag from "./MangaTag";

export default function MangaCard() {
    return (
        <div>
            <div className="max-w-sm rounded-md hover:scale-[95%] ease-linear duration-200">
                <div className="w-full lg:max-h-56 md:max-h-56 rounded-t-sm">
                    <a href="#">
                        <img 
                            className="object-cover" 
                            src="https://upload.wikimedia.org/wikipedia/en/7/79/Assassination_Classroom_DVD_1_Cover.jpg" alt="" 
                        />
                    </a>
                </div>
                <div className="py-2">
                    <MangaTag />
                    <a href="#">
                        <h5 className="text-md font-normal tracking-tight text-gray-900 dark:text-white">
                            Assassin classroom 2
                        </h5>
                    </a>
                    <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                        Tác giả Matsui Yusei
                    </p>
                </div>
            </div>
        </div>
    )
}