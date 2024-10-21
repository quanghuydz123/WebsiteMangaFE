import React, { useState, ChangeEvent } from 'react';

interface Image {
  id: number;
  url: string;
}

const ImageManager: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageToUpdateId, setImageToUpdateId] = useState<number | null>(null);

  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setNewImageFiles(selectedFiles);
    }
  };

  
  const addImages = () => {
    const newImages: Image[] = [];

    newImageFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage: Image = { id: Date.now() + index, url: reader.result as string };
        newImages.push(newImage);

        
        if (newImages.length === newImageFiles.length) {
          setImages([...images, ...newImages]);
          setNewImageFiles([]); 
        }
      };
      reader.readAsDataURL(file);
    });
  };

  
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  
  const handleUpdateFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && imageToUpdateId !== null) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
       
        const updatedImages = images.map((image) =>
          image.id === imageToUpdateId ? { ...image, url: reader.result as string } : image
        );
        setImages(updatedImages);
        setImageToUpdateId(null); 
      };

      reader.readAsDataURL(file);
    }
  };

  
  const triggerFileInputForUpdate = (id: number) => {
    setImageToUpdateId(id);
    document.getElementById('update-file-input')?.click();
  };

 
  const deleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Image Management</h2>

      {/* Form to add new images */}
      <form className="mb-4 space-y-4">
        <div>
          <label className="block font-semibold">Select Images:</label>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            className="border p-2 rounded w-full text-black"
          />
        </div>
        <button
          type="button"
          onClick={addImages}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Images
        </button>
      </form>

     
      <table className="min-w-full table-fixed">
        <thead>
          <tr className="text-sm md:text-base">
            <th className="px-4 py-2 text-left font-semibold text-slate-400 w-1/12">ID</th>
            <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Image</th>
            <th className="px-4 py-2 text-left font-semibold text-slate-400 w-5/12">Actions</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr className="border-b border-slate-200 text-sm md:text-base" key={image.id}>
              <td className="px-4 py-3 font-medium">{image.id}</td>
              <td className="px-4 py-3 font-medium">
                <img
                  src={image.url}
                  alt={`Image ${image.id}`}
                  className="w-24 h-24 object-cover cursor-pointer"
                  onClick={() => handleImageClick(image.url)} 
                />
              </td>
              <td className="px-4 py-3 space-y-2 sm:space-y-0 sm:space-x-2">
                {/* Button to update the image */}
                <button
                  onClick={() => triggerFileInputForUpdate(image.id)} 
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 w-full sm:w-auto"
                >
                  Update
                </button>
                {/* Button to delete the image */}
                <button
                  onClick={() => deleteImage(image.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hidden file input for updating images */}
      <input
        id="update-file-input"
        type="file"
        className="hidden"
        onChange={handleUpdateFileChange}
      />

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded relative">
            <button
              className="absolute top-2 right-2 text-red-600 text-4xl w-10 h-10 flex items-center justify-center hover:text-red-800"
              onClick={closeImageModal}
            >
              &times; {/* Close button */}
            </button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Enlarged Image"
                className="max-w-full max-h-[80vh] object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageManager;
