import { useParams } from 'react-router-dom';
import photos from './__mock__/index';

function PhotoCard() {
  const { id } = useParams<{ id: string }>();
  const photo = photos.find(p => p.id === parseInt(id || '0'));

  if (!photo) {
    return <div>Photo not found</div>;
  }

  return (
    <div>
      <h1>{photo.location}</h1>
      <img src={photo.imageUrl} alt={photo.location} />
      <p>{photo.description}</p>
    </div>
  );
}

export default PhotoCard;