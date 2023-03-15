import "./Container.css";

export const Container = ({ children }) => {
    return <div className="container-fluid">{children}</div>;
  };