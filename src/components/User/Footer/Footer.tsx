export default function Footer() {
    return (
        <div className="mx-auto p-4 bg-gray-800 text-white flex flex-col items-center">
            <p className="text-center">
                Chào mừng bạn đến với Mangastore - nơi cung cấp những bộ truyện tranh tuyệt vời nhất. 
                Khám phá các thể loại yêu thích và tìm kiếm những câu chuyện mới mỗi ngày!
            </p>
            <div className="mt-4">
                <a href="/" className="text-blue-400 hover:text-blue-300">Trang chủ</a> | 
                <a href="#" className="text-blue-400 hover:text-blue-300"> Giới thiệu</a> | 
                <a href="#" className="text-blue-400 hover:text-blue-300"> Liên hệ</a>
            </div>
            <div className="mt-4">
                <p>&copy; {new Date().getFullYear()} Mangastore. Tất cả quyền được bảo lưu.</p>
            </div>
        </div>
    );
}
