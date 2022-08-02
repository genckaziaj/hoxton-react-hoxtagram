import { useEffect, useState } from "react";
import { ImageList } from "./components/ImageList";
import { Logo } from "./components/Logo";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);

  function deletePost(id: number) {
    const imagesCopy = images.filter((image) => image.id !== id);

    fetch(`http://localhost:3001/images/${id}`, {
      method: "DELETE",
    });

    setImages(imagesCopy);
  }

  function createComment(content: string, imageId: number) {
    let newComment = {
      content: content,
      imageId: imageId,
    };

    fetch("http://localhost:3001/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((resp) => resp.json())
      .then((comment) => {
        const imagesCopy = structuredClone(images);
        const image = imagesCopy.find((image) => image.id === comment.imageId);
        image.comments.push(comment);

        setImages(imagesCopy);
      });
  }

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
      <Logo />
      <ImageList
        images={images}
        deletePost={deletePost}
        addLikes={addLikes}
        createComment={createComment}
      />
    </div>
  );
}

export default App;
