import type { Article } from '../../types/journey';
import styles from '../JourneyCards.module.css';

interface ArticleCardProps {
    article: Article;
}

function ArticleCard({ article }: ArticleCardProps) {
    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>{article.title}</h3>
            <p className={styles.cardDate}>Publicado em {new Date(article.createdAt).toLocaleDateString('pt-BR')}</p>
            <a href="#" className={styles.cardLink}>Ler Artigo</a>
        </div>
    );
}

export default ArticleCard;