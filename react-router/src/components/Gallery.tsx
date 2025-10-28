import { Link } from 'react-router-dom';
import photos from './__mock__/index';

function Gallery() {
  return (
    <div>
      <h1>Our Photo catalog</h1>
      <div>
        {photos.map((photo) => (
          <div key={photo.id}>
            <Link to={`/gallery/${photo.id}`}>
              <img src={photo.imageUrl} alt={photo.location} />
              <p>{photo.location}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;