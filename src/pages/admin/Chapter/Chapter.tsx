import React, { useState, ChangeEvent } from 'react';
import Pagination from '../../../components/Admin/Pagination/Pagination';
import { motion } from 'framer-motion';

interface Chapter {
  id: number;
  name: string;
  creationDate: string;
  photos: string[]; 
  isDeleted: boolean;
}

const ChapterTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; 

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Changed to page:', page);
  };

  const [chapters, setChapters] = useState<Chapter[]>([
    { id: 1, name: 'Chapter 1', creationDate: '2024-01-01', photos: [], isDeleted: false },
    { id: 2, name: 'Chapter 2', creationDate: '2024-01-02', photos: [], isDeleted: false }
  ]);

  // Ensure that photos is initialized as an empty array
  const [newChapter, setNewChapter] = useState<Partial<Chapter>>({ 
    name: '', 
    creationDate: '', 
    photos: [] // Initialize as an empty array
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewChapter((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 

  // Add new chapter
  const addChapter = () => {
    if (newChapter.name && newChapter.creationDate) {
      const id = chapters.length + 1;
      const chapter: Chapter = { id, ...newChapter, isDeleted: false } as Chapter;
      setChapters([...chapters, chapter]);
      setNewChapter({ name: '', creationDate: '', photos: [] }); // Reset state
    }
  };

  // Edit existing chapter
  const editChapter = (chapter: Chapter) => {
    setIsEditing(true);
    setCurrentChapter(chapter);
    setNewChapter({ name: chapter.name, creationDate: chapter.creationDate, photos: chapter.photos });
  };

  // Update chapter details
  const updateChapter = () => {
    if (currentChapter && newChapter.name && newChapter.creationDate) {
      setChapters(
        chapters.map((chapter) => (chapter.id === currentChapter.id ? { ...chapter, ...newChapter } : chapter))
      );
      setIsEditing(false);
      setNewChapter({ name: '', creationDate: '', photos: [] }); // Reset state
      setCurrentChapter(null);
    }
  };

  // Soft delete chapter
  const softDeleteChapter = (id: number) => {
    setChapters(chapters.map((chapter) => (chapter.id === id ? { ...chapter, isDeleted: true } : chapter)));
  };

  // Restore chapter
  const restoreChapter = (id: number) => {
    setChapters(chapters.map((chapter) => (chapter.id === id ? { ...chapter, isDeleted: false } : chapter)));
  };
  const viewImages = (id: number) => {
    console.log('Redirecting to episode management page for storyboard:', id);
    // Logic to redirect to episode management page
    window.open(`/Manga/${id}/chapter`, '_blank');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chapter Management Table</h2>

      <form className="mb-4 space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={newChapter.name || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full text-black"
            placeholder="Enter chapter name"
          />
        </div>
        <div>
          <label className="block font-semibold">Creation Date:</label>
          <input
            type="date"
            name="creationDate"
            value={newChapter.creationDate || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full text-black"
          />
        </div>
        
        <button
          type="button"
          onClick={isEditing ? updateChapter : addChapter}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update Chapter' : 'Add Chapter'}
        </button>
      </form>

      <motion.div className="flex-1 rounded-xl bg-white p-5 dark:bg-slate-600 dark:text-slate-300">
        <div className="overflow-hidden">
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="text-sm md:text-base">
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-1/12">ID</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Name</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Creation Date</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Photos</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((chapter) => (
                <tr className="border-b border-slate-200 text-sm md:text-base" key={chapter.id}>
                  <td className="px-4 py-3 font-medium">{chapter.id}</td>
                  <td className={`px-4 py-3 font-medium ${chapter.isDeleted ? 'line-through text-gray-400' : ''}`}>
                    {chapter.name}
                  </td>
                  <td className="px-4 py-3 font-medium">{chapter.creationDate}</td>
                  <td className="px-4 py-3">
                  <button
                    onClick={() => viewImages(chapter.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Manage Images
                  </button>
                </td>
                <td className="px-4 py-3 space-y-2 sm:space-y-0 sm:space-x-2">
                  {!chapter.isDeleted ? (
                    <>
                      <button
                        onClick={() => editChapter (chapter)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 w-full sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => softDeleteChapter (chapter.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => restoreChapter (chapter.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full sm:w-auto"
                    >
                      Restore
                    </button>
                  )}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ChapterTable;
