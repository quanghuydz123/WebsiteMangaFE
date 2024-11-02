import React, { ChangeEvent } from 'react';
import { Genre, UpdateMangaData } from '../../../constrants/apiResponse';
import ApiService from '../../../apis/apiService';
import { motion } from 'framer-motion';

const mangaUpdateService = new ApiService<UpdateMangaData>('manga/update-manga-byid');

interface MangaModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setUpdatedData: React.Dispatch<React.SetStateAction<UpdateMangaData>>;
    updatedData: UpdateMangaData;
    genres: Genre[];
    onSave: () => void; // Function to call when saving the update
}

const MangaModal: React.FC<MangaModalProps> = ({
    isOpen,
    setIsOpen,
    setUpdatedData,
    updatedData,
    genres,
    onSave
}) => {

    const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedGenres = Array.from(event.target.selectedOptions, (option) => option.value);
        setUpdatedData({ 
            ...updatedData, 
            updatedData: { 
                ...updatedData.updatedData, 
                genres: selectedGenres // Update genres here
            } 
        });
    };

    const handleUpdateManga = () => {
        console.log('Updating manga from modal:', updatedData); 
        onSave(); // Call the function passed from StoryboardTable to handle the update
    };

    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div className="bg-white p-4 rounded relative w-1/3">
                        <button
                            className="absolute top-2 right-2 text-red-600 text-2xl w-8 h-8 flex items-center justify-center hover:text-red-800"
                            onClick={() => setIsOpen(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-lg font-bold mb-4">{updatedData._id ? 'Edit Manga' : 'Add Manga'}</h2>
                        <div>
                            <label className="block mb-2">Name:</label>
                            <input
                                type="text"
                                value={updatedData.updatedData.name}
                                onChange={(e) => setUpdatedData({ ...updatedData, updatedData: { ...updatedData.updatedData, name: e.target.value } })}
                                className="border p-2 rounded w-full mb-4 text-black"
                                placeholder="Enter manga name"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Image URL:</label>
                            <input
                                type="text"
                                value={updatedData.updatedData.imageUrl}
                                onChange={(e) => setUpdatedData({ ...updatedData, updatedData: { ...updatedData.updatedData, imageUrl: e.target.value } })}
                                className="border p-2 rounded w-full mb-4 text-black"
                                placeholder="Enter image URL"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Summary:</label>
                            <textarea
                                value={updatedData.updatedData.summary}
                                onChange={(e) => setUpdatedData({ ...updatedData, updatedData: { ...updatedData.updatedData, summary: e.target.value } })}
                                className="border p-2 rounded w-full mb-4 text-black"
                                placeholder="Enter manga summary"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Genres:</label>
                            <select
                                multiple
                                onChange={handleGenreChange}
                                className="border p-2 rounded w-full mb-4 text-black"
                            >
                                {genres.map((genre) => (
                                    <option key={genre._id} value={genre._id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleUpdateManga}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                           {updatedData._id ? 'Update Manga' : 'Add Manga'}
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default MangaModal;
