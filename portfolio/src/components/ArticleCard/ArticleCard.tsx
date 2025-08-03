import type { Article } from '../../types/journey';
import styles from '../JourneyCards.module.css';

interface ArticleCardProps {
    article: Article;
    onClick: () => void;
}

function ArticleCard({ article, onClick }: ArticleCardProps) {
    return (
        <div className={styles.card} onClick={onClick} style={{ cursor: 'pointer' }}>
            <h3 className={styles.cardTitle}>{article.title}</h3>
            <p className={styles.cardDate}>Publicado em {new Date(article.createdAt).toLocaleDateString('pt-BR')}</p>
            <span className={styles.cardLink}>Ler Artigo</span>
        </div>
    );
}

export default ArticleCard;