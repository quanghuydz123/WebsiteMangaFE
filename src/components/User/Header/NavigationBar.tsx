import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function NavigationBar() {
    return (
        <div className="flex items-center gap-12">
            <a className="font-medium" href="home">Trang chủ</a>
            <a className="font-medium" href="news">Truyện mới</a>
            <a className="font-medium" href="ranking">Xếp hạng</a>
            <a className="font-medium" href="#">Thể loại <FontAwesomeIcon icon={faCaretDown} /></a>
        </div>
    )
}