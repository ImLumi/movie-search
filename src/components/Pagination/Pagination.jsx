import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'
import { v4 as uuid } from 'uuid';
import './Pagination.css';

function Pagination({ setPage, actualPage = 1, maxPage = 1 }) {
  const arr = Array.from({ length: (maxPage <= 9) ? maxPage : 9 }, (_, index) => {
    if ((actualPage - 4) <= 0) return 1 + index;
    if (actualPage + 4 >= maxPage) return maxPage - 8 + index;
    return (actualPage - 4) + index
  });
  arr[0] = 1;
  arr[arr.length - 1] = maxPage;
  if (arr.length === 9) {
    if (arr[1] !== 2) arr[1] = null;
    if (arr[arr.length - 2] !== maxPage - 1) arr[arr.length - 2] = null;
  }

  return (
    <div className="pagination">
      <button onClick={() => setPage(prev => prev - 1)} disabled={actualPage === 1}><MdOutlineArrowBackIos/></button>
      {
        arr.map((page) => (
          <button className={page === actualPage ? 'active' : ''} disabled={!page} onClick={() => setPage(page)}
                  key={uuid()}>
            {page || '...'}
          </button>
        ))
      }
      <button onClick={() => setPage(prev => prev + 1)} disabled={actualPage === maxPage}><MdOutlineArrowForwardIos/>
      </button>
    </div>
  );
}

export default Pagination;
