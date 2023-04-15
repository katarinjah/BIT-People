import "./Footer.css";

export const Footer = ({timeElapsed}) => {
    return (
        <footer>
            <div className="d-flex justify-content-between footer-wrapper">
                <div id="copyright">
                    <small>
                        © 2023 Copyright
                        <a className="bit-link" href="https://www.bgit.rs/en/"> BIT</a>
                    </small>
                </div>
                <div id="update">
                    <small>Last update: {timeElapsed}</small>
                </div>
            </div>
        </footer>
    );
}