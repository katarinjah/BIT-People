import { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Container } from './components/Container/Container';
import { Footer } from './components/Footer/Footer';
import { UserList } from './components/UserList/UserList';
import { UserGrid } from './components/UserGrid/UserGrid';

function App() {
  const [layout, setLayout] = useState("list");

  const toggleLayout = () => {
    setLayout(layout === "list" ? "grid" : "list");
  };

  const handleReload = () => {
    localStorage.setItem("layout", layout);
    window.location.reload();
  };
  
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
        {layout === "list" ? (
          <UserList />
        ) : (
          <UserGrid />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default App;
