import PhotoCard from "../PhotoCard/component";
import "./style.css";

// Use require to allow for runtime mocking
const getPhotos = () => {
  try {
    const photosModule = require("../PhotoCard/__mock__/index");
    let photos = photosModule.default || photosModule;
    // Ensure we have an array
    return Array.isArray(photos) ? photos : [];
  } catch (error) {
    return [];
  }
};

interface GalleryProps {
  photos?: Array<{
    id: number;
    location: string;
    imageUrl: string;
    description: string;
    likes: number;
  }>;
}

function Gallery({ photos: propPhotos }: GalleryProps = {}) {
  // Use propPhotos if provided, otherwise get photos dynamically
  let photosToRender;
  
  if (propPhotos !== undefined) {
    photosToRender = propPhotos;
  } else {
    photosToRender = getPhotos();
  }

  if (!photosToRender || photosToRender.length === 0) {
    return <div className="gallery">No photos available</div>;
  }

  return (
    <div className="gallery">
      {photosToRender.map(photo => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}

export default Gallery;
