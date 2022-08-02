export function ImageItem({ image, deletePost, addLikes, createComment }: any) {
  return (
    <article className="image-card">
      <h2 className="title">{image.title}</h2>
      <button
        onClick={() => {
          deletePost(image.id);
        }}
      >
        X
      </button>
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
        {image.comments.map((comment: any) => (
          <li className="comment" key={comment.id}>
            <span>{comment.content}</span>
          </li>
        ))}
      </ul>
      <form
        className="comment-form"
        onSubmit={(event) => {
          event.preventDefault();
          createComment(event.target.comment.value, image.id);
          event.target.reset();
        }}
      >
        <input
          className="comment-input"
          type="text"
          name="comment"
          placeholder="Add a comment..."
        />
        <button className="comment-button">Post</button>
      </form>
    </article>
  );
}
