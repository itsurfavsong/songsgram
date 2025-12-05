import './PostDelete.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postDeleteThunk } from '../../store/thunks/postDeleteThunk.js';

export default function PostDelete({id, setCloseDeleteModal}) {
  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch();
  const { show } = useSelector(state => state.postShow);
  const [openDeleteFlg, setOpenDeleteFlg] = useState(false);

  useEffect(() => {
    dispatch(postDeleteThunk(id));

    return () => {
      dispatch(clearPostDelete());
    }
  }, []);

  function openDeleteModal() {
    setOpenDeleteFlg(true);
  }
  function closeDeleteModal() {
    setOpenDeleteFlg(false);
  }

  return (
    <>
      <div className="post-delete-container">
        <div className="post-delete-content-box bg-light">
          <div className="post-delete-content-info">
            <p>삭제된 게시글은 되돌릴 수 없습니다.</p>
            <br />
            <p>정말 삭제하시겠습니까?</p>
          </div>
          <div className="post-delete-btn-box">
            <button type="button" className='btn-medium bg-dark' >Delete</button>
            <button type="button" className='btn-medium bg-gray' onClick={setCloseDeleteModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}
