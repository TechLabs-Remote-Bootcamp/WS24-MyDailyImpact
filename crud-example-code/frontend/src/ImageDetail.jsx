import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ImageDetail = () => {
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    // Fetch image details
    useEffect(() => {
        fetch(`http://localhost:5001/api/images/${id}`)
            .then(res => res.json())
            .then(data => setImage(data));
    }, [id]);

    // Fetch comments for the image
    useEffect(() => {
        fetch(`http://localhost:5001/api/images/${id}/comments`)
            .then(res => res.json())
            .then(data => setComments(data.comments));
    }, [id]);

    // Handle adding a new comment
    const handleComment = () => {
        fetch(`http://localhost:5001/api/images/${id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comment })
        })
        .then(() => {
            setComment("");
            fetch(`http://localhost:5001/api/images/${id}/comments`) // Re-fetch comments
                .then(res => res.json())
                .then(data => setComments(data.comments));
        });
    };

    if (!image) return <p>Loading...</p>;

    return (
        <div>
        <a href="http://localhost:5173/" style={{ marginBottom: '20px', display: 'block' }}>
            ← Back to Gallery
        </a>
            {/* Image Details */}
            <h1>{image.title}</h1>
            <img src={`http://localhost:5001/images/${image.path}`} alt={image.title} width="400" />
            <p>{image.description}</p>
            <h2>Ingredients:</h2>
            <ul>
                {image.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            {/* Comments Section */}
            <div>
                <h2>Comments</h2>
                <div>
                    <input 
                        type="text" 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        placeholder="Write a comment..."
                    />
                    <button onClick={handleComment}>Add Comment</button>
                </div>
                <div>
                    {comments.length === 0 ? (
                        <p>No comments yet. Be the first to comment!</p>
                    ) : (
                        comments.map((comment) => (
                            <p key={comment._id}>{comment.comment}</p>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageDetail;