import "./Header.css";

import { useNavigate } from 'react-router';
import { FaTh, FaThList, FaRedo } from 'react-icons/fa';

export const Header = ({ toggleLayout, layout, handleReload }) => {
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-light bg-light justify-content-start">
            <div id="header" onClick={() => navigate('/home')}>BIT People</div>
            <div id="about" onClick={() => navigate('/about')}>About</div>
            <div id="reload" onClick={handleReload}><FaRedo /></div>
            <div id="layout-icon" onClick={toggleLayout}>
                {layout === "list" ? <FaTh /> : <FaThList />}
            </div>
        </nav>
    );
}