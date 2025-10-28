interface Photo {
    id: number;
    location: string;
    imageUrl: string;
    description: string;
    likes: number;
}
 
const photos: Photo[] = [
    {
        id: 1,
        location: "London",
        imageUrl: "/src/assets/London.jpg",
        description: "Beautiful London cityscape",
        likes: 10,
    },
    {
        id: 2,
        location: "Paris",
        imageUrl: "/src/assets/Paris.jpg",
        description: "Eiffel Tower at sunset",
        likes: 15,
    },
    {
        id: 3,
        location: "Tokyo",
        imageUrl: "/src/assets/Tokio.jpg",
        description: "Cityscape of Tokyo",
        likes: 20,
    },
];
 
export default photos;