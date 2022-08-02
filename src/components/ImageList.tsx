import { ImageItem } from "./ImageItem";

export function ImageList({
  images,
  deletePost,
  addLikes,
  createComment,
}: any) {
  return (
    <section className="image-container">
      {images.map((image: any) => (
        <ImageItem
          key={image.id}
          image={image}
          deletePost={deletePost}
          addLikes={addLikes}
          createComment={createComment}
        />
      ))}
    </section>
  );
}
