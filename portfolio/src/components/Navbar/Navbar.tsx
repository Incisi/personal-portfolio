import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>David Incisi</Link>
            <div className={styles.links}>
                <Link to="/">Home</Link>
                <Link to="/journey">Jornada</Link>
            </div>
        </nav>
    );
}

export default Navbar;