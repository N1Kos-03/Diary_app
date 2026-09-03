import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import Journalitem from '../Journalitem/Journalitem';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ items, setItem }) {
  const { userId } = useContext(UserContext);
  
  const sortItems = (a, b) => new Date(a.date) - new Date(b.date);

  const filterItems = useMemo(() => items
    .filter(el => el.userId === userId)
    .sort(sortItems), [items, userId]);

  if (!items || items.length === 0) {
    return <p>Записей пока нет</p>;
  }

  return (
    <>
      {filterItems
        .map(el => (
          <CardButton key={el.id} onClick={() => setItem(el)}>
            <Journalitem
              title={el.title}
              post={el.post}
              date={el.date}
            />
          </CardButton>
      ))}
    </>
  );
}

export default JournalList;
