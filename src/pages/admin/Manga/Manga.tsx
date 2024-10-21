import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import Pagination from '../../../components/Admin/Pagination/Pagination';
import Title from '../../../components/Admin/Title/Title';

interface Episode {
  id: number;
  name: string;
}

interface Storyboard {
  id: number;
  name: string;
  photo: string;
  description: string;
  Chapters: Episode[];
  isDeleted: boolean;
}

const StoryboardTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Changed to page:', page);
  };

  const [storyboards, setStoryboards] = useState<Storyboard[]>([
    {
      id: 1,
      name: 'Storyboard 1',
      photo: 'https://via.placeholder.com/100',
      description: 'This is the description for Storyboard 1',
      Chapters: [
        { id: 1, name: 'Episode 1' },
        { id: 2, name: 'Episode 2' }
      ],
      isDeleted: false
    },
    {
      id: 2,
      name: 'Storyboard 2',
      photo: 'https://via.placeholder.com/100',
      description: 'This is the description for Storyboard 2',
      Chapters: [
        { id: 3, name: 'Episode 3' },
        { id: 4, name: 'Episode 4' }
      ],
      isDeleted: false
    }
  ]);

  const [newStoryboard, setNewStoryboard] = useState<Partial<Storyboard>>({
    name: '',
    photo: '',
    description: '',
    Chapters: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentStoryboard, setCurrentStoryboard] = useState<Storyboard | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewStoryboard((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setNewStoryboard((prev) => ({
          ...prev,
          photo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addStoryboard = () => {
    if (newStoryboard.name && newStoryboard.photo && newStoryboard.description) {
      const id = storyboards.length + 1;
      const storyboard: Storyboard = {
        id,
        name: newStoryboard.name as string,
        photo: newStoryboard.photo as string,
        description: newStoryboard.description as string,
        Chapters: [],
        isDeleted: false
      };
      setStoryboards([...storyboards, storyboard]);
      setNewStoryboard({ name: '', photo: '', description: '', Chapters: [] });
      setImagePreview(null);
    }
  };

  const editStoryboard = (storyboard: Storyboard) => {
    setIsEditing(true);
    setCurrentStoryboard(storyboard);
    setNewStoryboard({ name: storyboard.name, photo: storyboard.photo, description: storyboard.description });
    setImagePreview(storyboard.photo);
  };

  const updateStoryboard = () => {
    if (currentStoryboard && newStoryboard.name && newStoryboard.photo && newStoryboard.description) {
      setStoryboards(
        storyboards.map((storyboard) =>
          storyboard.id === currentStoryboard.id
            ? { ...storyboard, ...newStoryboard }
            : storyboard
        )
      );
      setIsEditing(false);
      setNewStoryboard({ name: '', photo: '', description: '' });
      setCurrentStoryboard(null);
      setImagePreview(null);
    }
  };

  const softDeleteStoryboard = (id: number) => {
    setStoryboards(
      storyboards.map((storyboard) =>
        storyboard.id === id ? { ...storyboard, isDeleted: true } : storyboard
      )
    );
  };

  const restoreStoryboard = (id: number) => {
    setStoryboards(
      storyboards.map((storyboard) =>
        storyboard.id === id ? { ...storyboard, isDeleted: false } : storyboard
      )
    );
  };

  const viewChapters = (id: number) => {
    console.log('Redirecting to episode management page for storyboard:', id);
    // Logic to redirect to episode management page
    window.open(`/Manga/${id}/chapter`, '_blank');
  };

  // Function to open the image modal
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  // Function to close the image modal
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <motion.div className="container mx-auto p-4">
      <Title>Storyboard Management Table</Title>

      {/* Add/Edit form */}
      <form className="mb-4 space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={newStoryboard.name || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Enter storyboard name"
          />
        </div>
        <div>
          <label className="block font-semibold">Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Storyboard Preview"
              className="w-16 h-16 object-cover rounded mt-2 cursor-pointer"
              onClick={() => handleImageClick(imagePreview)} 
            />
          )}
        </div>
        <div>
          <label className="block font-semibold">Description:</label>
          <textarea
            name="description"
            value={newStoryboard.description || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Enter storyboard description"
          />
        </div>
        <button
          type="button"
          onClick={isEditing ? updateStoryboard : addStoryboard}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update Storyboard' : 'Add Storyboard'}
        </button>
      </form>

    
      <div className="overflow-hidden">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="text-sm md:text-base">
              <th className="px-4 py-2 text-left font-semibold text-slate-400 w-1/12">ID</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Name</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Photo</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Description</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Chapters</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {storyboards.map((storyboard) => (
              <tr className="border-b border-slate-200 text-sm md:text-base" key={storyboard.id}>
                <td className="px-4 py-3 font-medium">{storyboard.id}</td>
                <td className={`px-4 py-3 font-medium ${storyboard.isDeleted ? 'line-through text-gray-400' : ''}`}>
                  {storyboard.name}
                </td>
                <td className="px-4 py-3">
                  <img
                    src={storyboard.photo}
                    alt={storyboard.name}
                    className="w-16 h-16 object-cover rounded cursor-pointer"
                    onClick={() => handleImageClick(storyboard.photo)} 
                  />
                </td>
                <td className="px-4 py-3 truncate">{storyboard.description}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => viewChapters(storyboard.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Manage Chapters
                  </button>
                </td>
                <td className="px-4 py-3 space-y-2 sm:space-y-0 sm:space-x-2">
                  {!storyboard.isDeleted ? (
                    <>
                      <button
                        onClick={() => editStoryboard(storyboard)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 w-full sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => softDeleteStoryboard(storyboard.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => restoreStoryboard(storyboard.id)}
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

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div className="bg-white p-4 rounded relative">
          <button
            className="absolute top-2 right-2 text-red-600 text-4xl w-10 h-10 flex items-center justify-center hover:text-red-800" 
            onClick={closeImageModal}
          >
            &times; {/* Close button */}
          </button>
            {selectedImage && (
              <img src={selectedImage} alt="Enlarged Storyboard" className="max-w-full max-h-[80vh] object-contain" />
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};



export default StoryboardTable;