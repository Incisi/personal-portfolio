import styles from './Hero.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <h1 className={styles.name}>David Incisi dos Santos</h1>
                <h2 className={styles.title}>
                    Engenheiro de Software | Desenvolvedor Back-end com Visão de Produto
                </h2>
                <p className={styles.subtitle}>
                    Construo soluções back-end robustas que resolvem problemas reais de negócio, unindo código e estratégia.
                </p>
                <div className={styles.ctaButtons}>
                    <a href="#projects" className={styles.btnPrimary}>Meus Projetos</a>
                    <a href="#contact" className={styles.btnSecondary}>Contato</a>
                </div>
                <div className={styles.socialLinks}>
                    <a href="https://github.com/incisi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com/in/incisi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Hero;