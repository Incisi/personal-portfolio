import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { motion } from 'framer-motion';
import styles from './Projects.module.css';

interface PinnedRepo {
    name: string;
    description: string;
    url: string;
    stargazerCount: number;
    primaryLanguage: { name: string; color: string; };
}

function Projects() {
    const [repos, setRepos] = useState<PinnedRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPinnedRepos() {
            try {
                setLoading(true);
                const response = await api.get<PinnedRepo[]>('/github/pinned-repos');
                setRepos(response.data);
                setError(null);
            } catch (err) {
                setError('Falha ao buscar os projetos do GitHub.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchPinnedRepos();
    }, []);

    return (
        <motion.section
            className={styles.projectsSection}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h2>Projetos em Destaque</h2>
            {loading && <p>Carregando projetos...</p>}
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.projectsGrid}>
                {repos.map((repo) => (
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" key={repo.name} className={styles.projectCard}>
                        <h3>{repo.name}</h3>
                        <p>{repo.description}</p>
                        <footer>
                            <span>⭐ {repo.stargazerCount}</span>
                            <span className={styles.language}>
                                <span className={styles.languageColor} style={{ backgroundColor: repo.primaryLanguage?.color }} />
                                {repo.primaryLanguage?.name}
                            </span>
                        </footer>
                    </a>
                ))}
            </div>
        </motion.section>
    );
}

export default Projects;