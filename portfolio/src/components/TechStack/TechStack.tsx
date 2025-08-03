import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { motion } from 'framer-motion';
import styles from './TechStack.module.css';
import { TechIcon } from '../../utils/IconMapper';

interface Technology {
    id: string;
    name: string;
    category: string;
    iconName: string;
    description: string;
}

interface GroupedTechs {
    [category: string]: Technology[];
}

function TechStack() {
    const [groupedTechs, setGroupedTechs] = useState<GroupedTechs>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTechs() {
            try {
                const response = await api.get<Technology[]>('/journey/tech-stack');
                const grouped = response.data.reduce((acc, tech) => {
                    (acc[tech.category] = acc[tech.category] || []).push(tech);
                    return acc;
                }, {} as GroupedTechs);
                setGroupedTechs(grouped);
            } catch (error) {
                console.error("Falha ao buscar tecnologias", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTechs();
    }, []);

    if (loading) return <section className={styles.techSection}><p>Carregando tecnologias...</p></section>

    return (
        <motion.section
            className={styles.techSection}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h2>Minhas Tecnologias</h2>
            <p className={styles.techSubtitle}>As ferramentas e tecnologias com as quais tenho experiência e venho me aprimorando.</p>
            <div className={styles.categories}>
                {Object.entries(groupedTechs).map(([category, technologies]) => (
                    <div key={category} className={styles.category}>
                        <h3>{category}</h3>
                        <div className={styles.techGrid}>
                            {technologies.map((tech) => (
                                <div key={tech.id} className={styles.techItem}>
                                    <div className={styles.techIcon}>
                                        <TechIcon iconName={tech.iconName} />
                                    </div>
                                    <span>{tech.name}</span>
                                    <div className={styles.descriptionPopup}>
                                        {tech.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}

export default TechStack;