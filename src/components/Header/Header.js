import "./Header.css";

import { useNavigate } from 'react-router';
import { FaTh, FaThList, FaRedo } from 'react-icons/fa';

export const Header = ({ toggleLayout, layout, handleReload }) => {
    const navigate = useNavigate();
    return (
        <div className="d-flex justify-content-between navbar">
            <div id="header">
                <span onClick={() => navigate('/home')}>BIT People</span>
            </div>
            <div className="header-icons">
                <span id="about" onClick={() => navigate('/about')}>About</span>
                <span id="reload" onClick={handleReload}><FaRedo /></span>
                <span id="layout-icon" onClick={toggleLayout}>
                    {layout === "list" ? <FaTh /> : <FaThList />}
                </span>
            </div>
        </div>
    );
}