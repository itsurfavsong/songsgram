import './PostCommentCreate.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postShowThunk } from '../../../store/thunks/postShowThunk.js';
import { storeCommentThunk } from '../../../store/thunks/commentCreateThunk.js';

export default function PostCommentCreate({postId, replyId = 0}) {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  async function handleCommentStore(e) {
    e.preventDefault();
  }

  async function storeComment() {
    await dispatch(storeCommentThunk({ postId, replyId, content }));
    await dispatch(postShowThunk(postId));
  }

  return (
    <>
      <form className="post-comment-create-box" onSubmit={handleCommentStore}>
        <input type="text" className="post-comment-create-input-add" onChange={(e) => { setContent(e.target.value) }} placeholder={`add comments...`} />
        <div onClick={storeComment} className="post-comment-create-btn-add" style={{backgroundImage: `url("http://localhost:5173/icons/btn-add.png")`}}></div>
      </form>
    </>
  )
}
