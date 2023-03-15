import "./Header.css";
import { FaTh } from 'react-icons/fa';
import { FaThList } from 'react-icons/fa';

export const Header = ({ toggleLayout, layout }) => {
    return (
        <nav className="navbar navbar-light bg-light justify-content-start">
            <div id="header">BIT People</div>
            <div id="layout-icon" onClick={toggleLayout}>
                {layout === "list" ? <FaTh /> : <FaThList />}
            </div>
        </nav>
    );
}