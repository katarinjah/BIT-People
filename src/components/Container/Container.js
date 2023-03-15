import "./Container.css";
// import { UserList } from '../UserList/UserList';
import { UserGrid } from '../UserGrid/UserGrid';

export const Container = () => {
    return (
        <div className="container-fluid">
            {/* <UserList /> */}
            <UserGrid />
        </div>
    );
}