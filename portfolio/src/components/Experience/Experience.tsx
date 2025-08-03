import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { motion } from 'framer-motion';
import styles from './Experience.module.css';

interface Experience {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string[];
}

function Experience() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExperiences() {
            try {
                const response = await api.get<Experience[]>('/journey/experiences');
                setExperiences(response.data);
            } catch (error) {
                console.error("Falha ao buscar experiências", error);
            } finally {
                setLoading(false);
            }
        }
        fetchExperiences();
    }, []);

    if (loading) return <section className={styles.experienceSection}><p>Carregando experiências...</p></section>

    return (
        <motion.section
            className={styles.experienceSection}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h2>Experiência Profissional</h2>
            <div className={styles.timeline}>
                {experiences.map((exp) => (
                    <div key={exp.id} className={styles.timelineItem}>
                        <div className={styles.timelineDot}></div>
                        <div className={styles.timelineContent}>
                            <h3>{exp.role}</h3>
                            <h4 className={styles.company}>{exp.company}</h4>
                            <p className={styles.period}>{exp.period}</p>
                            <ul>
                                {exp.description.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}

export default Experience;