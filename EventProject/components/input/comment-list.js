import classes from './comment-list.module.css';

function CommentList(props) {
  const { comments } = props;

  return (
    <ul className={classes.comments}>
      {comments.map((comment) => {
        const { id, name, text } = comment;

        return (
          <li key={id}>
            <p>{text}</p>
            <div>
              By <address>{name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
