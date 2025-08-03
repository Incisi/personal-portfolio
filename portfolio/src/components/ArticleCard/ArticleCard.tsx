import type { Article } from '../../types/journey';
import styles from '../CourseCard/JourneyCard.module.css';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
    article: Article;
}

function ArticleCard({ article }: ArticleCardProps) {
    return (
        <Link to={`/articles/${article.id}`} className={`${styles.card} ${styles.cardLink}`}>
            <h3 className={styles.cardTitle}>{article.title}</h3>
            <p className={styles.cardDate}>
                Publicado em {new Date(article.createdAt).toLocaleDateString('pt-BR')}
            </p>
            <span>Ler Artigo</span>
        </Link>
    );
}

export default ArticleCard;