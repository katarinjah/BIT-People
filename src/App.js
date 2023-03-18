import { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Container } from './components/Container/Container';
import { Loader } from './components/Loader/Loader'
import { SearchField } from './components/SearchField/SearchField'
import { Footer } from './components/Footer/Footer';
import { UserList } from './components/UserList/UserList';
import { UserGrid } from './components/UserGrid/UserGrid';

function App() {
  const [layout, setLayout] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

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
      setIsLoading(true);
      const response = await fetch("https://randomuser.me/api/?results=15");
      const data = await response.json();
      setUsers(data.results);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setIsSearching(true);
    const newFilteredUsers = users.filter(user => user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) || user.name.last.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredUsers(newFilteredUsers);
    setIsSearching(false);
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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isSearching ? null : <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}
            {layout === "list" ? (
              <UserList users={filteredUsers} />
            ) : (
              <UserGrid users={filteredUsers} />
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default App;
