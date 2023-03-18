import './NoResults.css';
import { FaRegMeh } from 'react-icons/fa';

export const NoResults = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center wrapper">
                <FaRegMeh className="icon" />
                <div id="no-match">We couldn't find any people matching your search</div>
            </div>
        </div>
    );
}

      