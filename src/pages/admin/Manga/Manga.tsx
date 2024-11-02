import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Pagination from '../../../components/Admin/Pagination/Pagination';
import Title from '../../../components/Admin/Title/Title';
import { Base, Manga, UpdateMangaData, Genre, DTOManga, DTOMangaCreate } from '../../../constrants/apiResponse';
import ApiService from '../../../apis/apiService';
import MangaModal from './MangaModal';

const emptyUpdateData: UpdateMangaData = {
  _id: '',
  updatedData: {
    name: undefined,
    summary: undefined,
    imageUrl: undefined,
    isDeleted: undefined,
    genres: [] 
  }
};
const mangaData: DTOManga = {
  _id: '',
  name: '',
  summary: '',
  imageUrl: '',
  authorName: [],
  genreName: [],
  isDeleted: false,
  createdAt: '',
  updatedAt: ''
};
const mangaService = new ApiService<DTOManga>('manga/get-all-admin');
const mangaUpdateService = new ApiService<UpdateMangaData>('manga/update-manga-byid');
const mangaAddService = new ApiService<Manga>('manga');
const genreService = new ApiService<Genre>('genres/get-page');

const StoryboardTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false); 
  const [updatedData, setUpdatedData] = useState<UpdateMangaData>(emptyUpdateData);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [storyboards, setStoryboards] = useState<DTOManga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetchManga(currentPage);
    fetchGenres();
  }, [currentPage]);

  const fetchGenres = async () => {
    try {
      const response = await genreService.getAllGenres();
      setGenres(response.data.data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };
  mangaAddService.createManga(mangaData)
    .then(response => {
      console.log('Manga created successfully:', response.data);
    })
    .catch(error => {
      console.error('Error creating manga:', error.response?.data?.message || error.message);
    });

    const addManga = async () => {
      try {
        const newMangaData: DTOMangaCreate = {
          _id: '', 
          name: updatedData.updatedData.name || 'Default Name',
          summary: updatedData.updatedData.summary || 'Default Summary',
          imageUrl: updatedData.updatedData.imageUrl || 'https://defaultimageurl.com/image.jpg',
          authorName: [], // Thêm tác giả nếu có
          genreName: updatedData.updatedData.genres || [],
          isDeleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publish_date: new Date().toISOString(), // Giá trị ngày xuất bản mặc định
          publisher: 'defaultPublisherId', // Thay thế bằng ObjectId hợp lệ của nhà xuất bản
          status: 1, // Thiết lập trạng thái hợp lệ
          views: 0
        };
    
        console.log('Adding new manga with data:', newMangaData);
        const response = await mangaAddService.createManga(newMangaData);
        console.log('Manga added successfully:', response.data);
        fetchManga(currentPage); // Refresh list after adding
      } catch (error: any) {
        console.error('Error creating manga:', error.response?.data?.message || error.message);
      } finally {
        setIsModalOpen(false);
      }
    };
    
    
  
    const openAddModal = () => {
      setIsAddMode(true); // Set mode to add
      setUpdatedData(emptyUpdateData); // Clear the form
      setIsModalOpen(true);
    };

  const openEditModal = (storyboard: DTOManga) => {
    const currentManga = { ...emptyUpdateData };
    currentManga._id = storyboard._id;
    currentManga.updatedData.name = storyboard.name;
    currentManga.updatedData.imageUrl = storyboard.imageUrl;
    currentManga.updatedData.summary = storyboard.summary;
    currentManga.updatedData.genres = storyboard.genreName; // Ensure genres are set properly
    setUpdatedData(currentManga);
    setIsModalOpen(true);
  };

  const updateManga = async () => {
    try {
      console.log('Updating manga with data:', updatedData); // Debug output
      const response = await mangaUpdateService.updateMangaById(updatedData);
      console.log('Manga updated successfully:', response.data.data);
      
      // Refresh storyboards to reflect the update
      fetchManga(currentPage);
    } catch (error) {
      console.error('Error updating manga:', error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const fetchManga = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await mangaService.getAllManga({
        page,
        limit: 10,
      });
      const { docs, totalPages } = response.data.data;
      setStoryboards(docs);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching manga:', error);
      setStoryboards([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <motion.div className="container mx-auto p-4">
      <Title>Storyboard Management Table</Title>
      {isModalOpen && (
        <MangaModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          setUpdatedData={setUpdatedData}
          updatedData={updatedData}
          genres={genres}
          onSave={isAddMode ? addManga : updateManga}
        />
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-hidden">
          {/* Button container */}
          <div className="flex justify-between mb-4">
            <div></div>
            <button onClick={openAddModal} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Thêm truyện mới
            </button>
          </div>
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="text-sm md:text-base">
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-1/12">ID</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Tên</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Ảnh</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Tóm tắt</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Thể loại</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Chương</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {storyboards.map((storyboard) => (
                <tr className="border-b border-slate-200 text-sm md:text-base" key={storyboard._id}>
                  <td className="px-4 py-3 font-medium">{storyboard._id}</td>
                  <td className="px-4 py-3 font-medium">{storyboard.name}</td>
                  <td className="px-4 py-3">
                    <img
                      src={storyboard.imageUrl}
                      alt={storyboard.name}
                      className="w-40 h-40 object-cover rounded cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3">
                    {storyboard.summary.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {storyboard.genreName}
                  </td>
                  <td className="px-4 py-3  ">
                    <button
                      onClick={() => window.open(`/admin/Manga/${storyboard._id}/Chapter`, '_blank')}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Chi tiết
                    </button>
                  </td>
                  <td className="px-4 py-3 ">
                    <button
                      onClick={() => openEditModal(storyboard)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Sửa   
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </motion.div>
  );
};

export default StoryboardTable;
