import './App.css';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider, UserContext } from './context/user.context';
import { useContext, useState } from 'react';

function App() {
  const [items, setItems] = useLocalStorage('data', []);
  const [selectedItem, setSelectedItem] = useState(null);
  const { userId } = useContext(UserContext);

  const addItem = (item) => {
    if (!item.id) {
      const newItem = {
        ...item,
        date: new Date(item.date),
        userId,
        id: items.length > 0 ? Math.max(...items.map(el => el.id)) + 1 : 1,
      };
      setItems([...items, newItem]);
    } else {
      const updatedItems = items.map(el =>
        el.id === item.id
          ? { ...item, date: new Date(item.date), userId }
          : el
      );
      setItems(updatedItems);
    }
    setSelectedItem(null); 
  };

  const deleteItem = (id) => {
    setItems(items.filter(i => i.id !== id));
    setSelectedItem(null); 
  };

  return (
    <UserContextProvider>
      <div className='app'>
        <LeftPanel>
          <Header />
          <JournalAddButton clearForm={() => setSelectedItem(null)} />
          <JournalList items={items} setItem={setSelectedItem} />
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem} onDelete={deleteItem} data={selectedItem}
          />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
