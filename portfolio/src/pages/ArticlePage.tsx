import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import type { Article } from '../types/journey';
import ReactMarkdown from 'react-markdown';
import styles from './ArticlePage.module.css';

function ArticlePage() {
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            const fetchArticle = async () => {
                try {
                    setLoading(true);
                    const response = await api.get<Article>(`/journey/articles/${id}`);
                    setArticle(response.data);
                } catch (err) {
                    setError('Artigo não encontrado.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchArticle();
        }
    }, [id]);

    if (loading) {
        return <div className={styles.container}><p>Carregando artigo...</p></div>;
    }

    if (error) {
        return <div className={styles.container}><p className={styles.error}>{error}</p></div>;
    }

    return (
        <main className={`${styles.container} container`}>
            <h1>{article?.title}</h1>
            <p className={styles.publishDate}>
                Publicado em {new Date(article?.createdAt || '').toLocaleDateString('pt-BR', {
                    day: 'numeric', month: 'long', year: 'numeric'
                })}
            </p>
            <div className={styles.articleContent}>
                <ReactMarkdown>{article?.content || ''}</ReactMarkdown>
            </div>
        </main>
    );
}

export default ArticlePage;