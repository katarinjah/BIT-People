import { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Container } from './components/Container/Container';
import { SearchField } from './components/SearchField/SearchField'
import { Footer } from './components/Footer/Footer';
import { UserList } from './components/UserList/UserList';
import { UserGrid } from './components/UserGrid/UserGrid';

function App() {
  const [layout, setLayout] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const toggleLayout = () => {
    localStorage.setItem("layout", layout === "list" ? "grid" : "list");
    setLayout(layout === "list" ? "grid" : "list");
  };  

  const handleReload = () => {
    localStorage.setItem("layout", layout);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch("https://randomuser.me/api/?results=15");
        const data = await response.json();
        setUsers(data.results);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newFilteredUsers = users.filter(user => user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) || user.name.last.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredUsers(newFilteredUsers);
  }, [searchQuery, users])

  useEffect(() => {
    const storedLayout = localStorage.getItem("layout");
    if (storedLayout) {
      setLayout(storedLayout);
    };
  }, []);

  return (
    <>
      <Header toggleLayout={toggleLayout} layout={layout} setLayout={setLayout} handleReload={handleReload} />
      <Container>
        <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        {layout === "list" ? (
          <UserList users={filteredUsers} />
        ) : (
          <UserGrid users={filteredUsers} />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default App;
