import React, { useState } from "react";

const ImageUpload = ({ onImageSelect, defaultImage }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (allowedImageTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
          setError("");
          onImageSelect(file);
        };
        reader.readAsDataURL(file);
      } else {
        setError("Invalid file type. Please upload a valid image.");
      }
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setError("");
  };

  return (
    <div className="flex items-center justify-left w-auto">
      <label
        htmlFor="dropzone-file"
        className="flex w-auto items-center min-h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 p-3"
      >
        {defaultImage && !image ? (
          <img
            src={defaultImage}
            alt="Preview"
            className="h-full object-cover rounded-lg"
          />
        ) : image ? (
          <img
            src={image}
            alt="Preview"
            className="h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex flex-col w-full items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 ">
              <span className="font-semibold">
                Haz clic para cargar una imagen
              </span>
            </p>
            <p className="text-xs text-gray-500 ">PNG, JPG o JPEG</p>
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </label>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ImageUpload;
