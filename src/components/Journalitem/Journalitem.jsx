import './Journalitem.css';
function Journalitem({title, post, date}) {

  const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);

  return (
      <>
        <h2 className='journal-item__title'>{title}</h2>
        <div className='journal-item__body'>
            <div className='journal-item__data'>{formatedDate}</div>
            <div className='journal-item__text'>{post}</div>
        </div>
      </>
 );
}

export default Journalitem;