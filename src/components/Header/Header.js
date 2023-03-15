import "./Header.css";
import { FaTh, FaThList, FaRedo } from 'react-icons/fa';

export const Header = ({ toggleLayout, layout, handleReload }) => {
    return (
        <nav className="navbar navbar-light bg-light justify-content-start">
            <div id="header">BIT People</div>
            <div id="reload" onClick={handleReload}><FaRedo /></div>
            <div id="layout-icon" onClick={toggleLayout}>
                {layout === "list" ? <FaTh /> : <FaThList />}
            </div>
        </nav>
    );
}