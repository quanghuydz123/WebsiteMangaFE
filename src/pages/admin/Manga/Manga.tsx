import React, { useState, ChangeEvent } from 'react';
import Pagination from '../../../components/Admin/Pagination/Pagination';
import { motion } from 'framer-motion'; 
import Title from '../../../components/Admin/Title/Title';


interface Episode {
  id: number;
  name: string;
}

interface Storyboard {
  id: number;
  name: string;
  photo: string;
  episodes: Episode[];
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
      episodes: [
        { id: 1, name: 'Episode 1' },
        { id: 2, name: 'Episode 2' }
      ],
      isDeleted: false
    },
    {
      id: 2,
      name: 'Storyboard 2',
      photo: 'https://via.placeholder.com/100',
      episodes: [
        { id: 3, name: 'Episode 3' },
        { id: 4, name: 'Episode 4' }
      ],
      isDeleted: false
    }
  ]);

  const [newStoryboard, setNewStoryboard] = useState<Partial<Storyboard>>({
    name: '',
    photo: '',
    episodes: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentStoryboard, setCurrentStoryboard] = useState<Storyboard | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStoryboard((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const addStoryboard = () => {
    if (newStoryboard.name && newStoryboard.photo) {
      const id = storyboards.length + 1;
      const storyboard: Storyboard = {
        id,
        name: newStoryboard.name as string,
        photo: newStoryboard.photo as string,
        episodes: [],
        isDeleted: false
      };
      setStoryboards([...storyboards, storyboard]);
      setNewStoryboard({ name: '', photo: '', episodes: [] });
    }
  };

  const editStoryboard = (storyboard: Storyboard) => {
    setIsEditing(true);
    setCurrentStoryboard(storyboard);
    setNewStoryboard({ name: storyboard.name, photo: storyboard.photo });
  };

  const updateStoryboard = () => {
    if (currentStoryboard && newStoryboard.name && newStoryboard.photo) {
      setStoryboards(
        storyboards.map((storyboard) =>
          storyboard.id === currentStoryboard.id
            ? { ...storyboard, ...newStoryboard }
            : storyboard
        )
      );
      setIsEditing(false);
      setNewStoryboard({ name: '', photo: '' });
      setCurrentStoryboard(null);
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

  const viewEpisodes = (id: number) => {
    console.log('Redirecting to episode management page for storyboard:', id);
    // Logic to redirect to episode management page
  };

  return (
    <motion.div className="container mx-auto p-4">
      <Title>Storyboard Management Table</Title>

      {/* Add/Edit storyboard form */}
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
          <label className="block font-semibold">Photo URL:</label>
          <input
            type="text"
            name="photo"
            value={newStoryboard.photo || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Enter storyboard photo URL"
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

      {/* Storyboard list */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-sm md:text-base">
              <th className="px-4 py-2 text-left font-semibold text-slate-400">ID</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-400">Name</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-400">Photo</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-400">Episodes</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-400">Actions</th>
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
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">
                  <ul>
                    {storyboard.episodes.map((episode) => (
                      <li key={episode.id}>{episode.name}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 space-x-2">
                  {!storyboard.isDeleted ? (
                    <>
                      <button
                        onClick={() => editStoryboard(storyboard)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => softDeleteStoryboard(storyboard.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => viewEpisodes(storyboard.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Manage Episodes
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => restoreStoryboard(storyboard.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </motion.div>
  );
};

export default StoryboardTable;
