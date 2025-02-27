import React, { useState, useEffect, useRef } from "react";
import Image from "../Image";
import clsx from "clsx";

const ImageGallery = ({
  images,
  className,
  width,
  transitionDuration = 500,
  aspectRatio = "16:9",
  thumbsToShow = 7,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [mainImageHeight, setMainImageHeight] = useState(0);
  const mainImageRef = useRef(null);

  console.log("images", images);

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
      setThumbnailIndex(images.length - thumbsToShow);
      return;
    }

    if (currentIndex == thumbnailIndex) {
      setThumbnailIndex(thumbnailIndex - 1);
    }
    setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
      setThumbnailIndex(0);
      return;
    }

    if (currentIndex == thumbsToShow - 1 + thumbnailIndex) {
      setThumbnailIndex(thumbnailIndex + 1);
    }

    setCurrentIndex(currentIndex + 1);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrevThumbnails = () => {
    setThumbnailIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextThumbnails = () => {
    const maxIndex = Math.ceil(images.length / thumbsToShow) - 1;
    setThumbnailIndex((prevIndex) =>
      prevIndex === maxIndex ? 0 : prevIndex + 1
    );
  };

  const [aspectRatioWidth, aspectRatioHeight] = aspectRatio.split(":");
  const newAspectRatio = aspectRatioWidth / aspectRatioHeight;
  const paddingBottom = `${(1 / newAspectRatio) * 100}%`;

  const subImageWidth = `${(1 / thumbsToShow) * 100}%`;
  const subImageHeight = `${mainImageHeight / thumbsToShow}px`;

  useEffect(() => {
    if (mainImageRef.current) {
      setMainImageHeight(mainImageRef.current.offsetHeight);
    }
  }, [currentIndex, images]);

  return (
    <div
      className={clsx("flex flex-col items-center", className)}
      style={{ width }}
    >
      <div className="relative w-full overflow-hidden">
        <div
          className={`flex transition-transform duration-${transitionDuration}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <div className="relative w-full" style={{ paddingBottom }}>
                <Image
                  src={image?.src || ""}
                  alt={image?.alt || ""}
                  width="100%"
                  height="100%"
                  shadow
                  ref={index === currentIndex ? mainImageRef : null}
                  className="absolute top-0 left-0 rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
          >
            &gt;
          </button>
        </>
      </div>

      {/* Thumbnail carousel */}
      <div className="flex flex-col items-center justify-center mt-4 w-full">
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${
                thumbnailIndex * (100 / thumbsToShow)
              }%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 p-1 overflow-hidden"
                style={{
                  width: subImageWidth,
                  height: subImageHeight,
                }}
              >
                <Image
                  src={image?.src || ""}
                  alt={image?.alt || ""}
                  width="100%"
                  height="100%"
                  shadow
                  className={`cursor-pointer object-cover ${
                    index === currentIndex ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              </div>
            ))}
          </div>
          <>
            <button
              onClick={handlePrevThumbnails}
              disabled={thumbnailIndex === 0}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 shadow-lg disabled:opacity-50"
            >
              &lt;
            </button>
            <button
              onClick={handleNextThumbnails}
              disabled={
                thumbnailIndex >= Math.ceil(images.length / thumbsToShow) - 1
              }
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 shadow-lg disabled:opacity-50"
            >
              &gt;
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
