import { Author, Manga } from "../../../constrants/type";
import MangaTag from "./MangaTag";

export default function MangaCard({item}: {item: Manga}) {
    return (
        <div>
            <div className="max-w-sm rounded-md hover:scale-[95%] ease-linear duration-200 text-center md:text-left mx-auto">
                <div className="w-full lg:max-h-56 md:max-h-56 rounded-t-sm">
                    <a href="#">
                        <img 
                            className="object-cover mx-auto" 
                            src={item.imageUrl} alt="" 
                        />
                    </a>
                </div>
                <div className="py-2">
                    <MangaTag status={item.status}/>
                    <a href="#">
                        <h5 className="text-md font-normal tracking-tight text-white">
                            {item.name}
                        </h5>
                    </a>
                    {item.author.map((item:Author, index) => (
                        <p className="text-sm font-normal text-gray-400">
                            {item.name}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}