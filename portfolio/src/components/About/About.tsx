import { motion } from 'framer-motion';
import styles from './About.module.css';

function About() {
    return (
        <motion.section
            className={styles.about}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className={styles.aboutContent}>
                <img src="/profile-pic.webp" alt="David Incisi" className={styles.profilePic} />
                <div className={styles.textContent}>
                    <h2>Sobre Mim</h2>
                    <p>
                        Sou um Engenheiro de Software apaixonado por construir soluções que não apenas funcionam de forma robusta, mas que também resolvem problemas reais de negócio e de usuários. Com formação técnica em Desenvolvimento de Sistemas e cursando Engenharia de Software, meu foco está no ecossistema back-end com Node.js, NestJS e bancos de dados SQL/NoSQL.
                    </p>
                    <p>
                        Minha trajetória profissional me permite atuar na fronteira entre Marketing e Tecnologia. Essa vivência me capacita não apenas a desenvolver soluções técnicas, como ferramentas de automação e dashboards de análise, mas principalmente a entender o porquê por trás de cada projeto. Meu envolvimento em dinâmicas que abrangem desde o P&D de produtos, análise sensorial e análise de desempenho digital até a estratégia da marca que me proporciona uma perspectiva valiosa sobre o ciclo de vida completo de um produto e as reais necessidades do usuário final.
                    </p>
                    <div className={styles.motto}>
                        <p>"Cure, vive, somnia et perfice."</p>
                        <p>Natus Vincere</p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default About;