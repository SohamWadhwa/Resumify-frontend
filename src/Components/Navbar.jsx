import '../styles/Navbar.css';
export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-item-container">
                    <div className="brand-name">
                        Resumif<span style={{color: "#398ff7"}}>y</span>
                    </div>
                    <div className="navbar-links">
                        <a href='/'>Home</a>
                        <a href='/tips'>Tips</a>
                        <a className='build-resume'>
                            Build Resume
                            <div className="build-resume-dropdown">
                                <div className="arrow"></div>
                                <div className="dropdown">
                                    <span>Coming Soon!</span>
                                </div>
                            </div>
                        </a>
                        <a href='/about-me'>About Us</a>
                    </div>
                </div>
            </nav>
        </>
    )
}