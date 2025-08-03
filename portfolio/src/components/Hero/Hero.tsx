import styles from './Hero.module.css';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <motion.section
            className={styles.hero}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className={styles.heroContent}>
                <h1 className={styles.name}>David Incisi</h1>
                <h2 className={styles.title}>
                    Engenheiro de Software | Desenvolvedor Back-end com Visão de Produto
                </h2>
                <p className={styles.subtitle}>
                    Construo soluções back-end robustas que resolvem problemas reais de negócio, unindo código e estratégia.
                </p>
                <div className={styles.ctaButtons}>
                    <Link to="/journey" className={styles.btnPrimary}>Minha Jornada</Link>
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
        </motion.section>
    );
}

export default Hero;