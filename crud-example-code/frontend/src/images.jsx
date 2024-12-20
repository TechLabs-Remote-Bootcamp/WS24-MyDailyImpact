import { useState, useEffect } from "react";

const Images = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/images")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setImages(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      <ul>
        {images.map(image => (
          <li key={image._id}>
            <a href={`http://localhost:5173/api/images/${image._id}`}>
              <img src={`http://localhost:5001/images/${image.path}`} alt={image.title} width="200" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Images;