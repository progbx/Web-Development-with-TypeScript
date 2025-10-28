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
        imageUrl: "../src/assets/London.jpg",
        description: "Big Ben Clock Tower",
        likes: 10,
    },
    {
        id: 2,
        location: "Paris",
        imageUrl: "../src/assets/Paris.jpg",
        description: "Eiffel Tower at sunset",
        likes: 15,
    },
    {
        id: 3,
        location: "Tokyo",
        imageUrl: "../src/assets/Tokio.jpg",
        description: "Cityscape of Tokyo",
        likes: 20,
    },
    {
        id: 4,
        location: "Sydney",
        imageUrl: "../src/assets/Sydney.jpg",
        description: "Sydney day view with sailboats",
        likes: 20,
    },
    {
        id: 5,
        location: "London1",
        imageUrl: "../src/assets/London.jpg",
        description: "Big Ben Tower",
        likes: 10,
    },
    {
        id: 6,
        location: "Paris1",
        imageUrl: "../src/assets/Paris.jpg",
        description: "Eiffel Tower",
        likes: 15,
    },
];

export default photos;
