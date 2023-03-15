import "./Container.css";
import { UserList } from '../UserList/UserList';

export const Container = () => {
    return (
        <div className="container-fluid">
            <UserList />
        </div>
    );
}