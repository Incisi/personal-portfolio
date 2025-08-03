import styles from './Footer.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.socialLinks}>
                <a href="https://github.com/incisi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub />
                </a>
                <a href="https://linkedin.com/in/incisi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin />
                </a>
            </div>
            <p>Desenvolvido com Vite & NestJS</p>
            <p>&copy; {currentYear} David Incisi dos Santos. Todos os direitos reservados.</p>
        </footer>
    );
}

export default Footer;