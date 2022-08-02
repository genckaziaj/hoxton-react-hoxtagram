import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);

  function addLikes(id: number) {
    let imagesCopy = structuredClone(images);

    const match = imagesCopy.find((image) => image.id === id);
    match.likes++;

    fetch(`http://localhost:3001/images/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(match),
    });

    setImages(imagesCopy);
  }

  useEffect(() => {
    fetch("http://localhost:3001/images")
      .then((resp) => resp.json())
      .then((imagesFromServer) => {
        setImages(imagesFromServer);
      });
  }, []);

  return (
    <div className="App">
      <img className="logo" src="assets/hoxtagram-logo.png" />
      {/* <!-- image cards --> */}
      <section className="image-container">
        {/* <!-- This is the HTML for each card. Use the following HTML as reference to build your React components --> */}
        {images.map((image) => (
          <article className="image-card" key={image.id}>
            <h2 className="title">{image.title}</h2>
            <img src={image.image} className="image" />
            <div className="likes-section">
              <span className="likes">{image.likes} likes</span>
              <button
                className="like-button"
                onClick={() => {
                  addLikes(image.id);
                }}
              >
                ♥
              </button>
            </div>
            <ul className="comments">
              <li>Get rid of these comments</li>
              <li>And replace them with the real ones</li>
              <li>From the server</li>
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}

export default App;
