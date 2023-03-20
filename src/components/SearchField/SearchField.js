import "./SearchField.css";
import { FaSearch } from 'react-icons/fa';

export const SearchField = ({searchQuery, setSearchQuery }) => {
  
  return (
    <div className="input-group mb-3 search-container">
      <span className="input-group-text bg-transparent border-0">
        <FaSearch />
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Search users"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
