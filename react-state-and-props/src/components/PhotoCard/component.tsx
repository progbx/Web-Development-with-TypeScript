import { useState } from "react";
import LikeIcon from "../../assets/icons/like";
import "./style.css";

interface Photo {
  id?: number;
  location: string;
  imageUrl: string;
  description: string;
  likes?: number;
}

interface PhotoCardProps {
  photo: Photo;
}

function PhotoCard({ photo }: PhotoCardProps) {
  const [likes, setLikes] = useState(photo.likes || 0);

  return (
    <div className="photo-card" data-testid="photo-card">
      <div className="photo-card-location">
        {/* Location icon */}
        <span className="photo-card-location-icon">📍</span>
        <span>{photo.location}</span>
      </div>
      <img src={photo.imageUrl} alt={photo.description} className="photo-card-image" />
      <div className="photo-card-description">{photo.description}</div>
      <button className="photo-card-like-btn" onClick={() => setLikes(likes + 1)}>
        <LikeIcon /> Like
      </button>
      <div className="photo-card-likes">{likes}</div>
    </div>
  );
}

export default PhotoCard;
