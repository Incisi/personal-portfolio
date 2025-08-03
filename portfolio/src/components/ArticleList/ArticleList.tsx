import type { Article } from '../../types/journey';
import ArticleCard from '../ArticleCard/ArticleCard';
import styles from '../JourneyLists.module.css';

const ArticleList = ({ articles, onArticleClick }: { articles: Article[], onArticleClick: (article: Article) => void }) => (
    <div className={styles.grid}>
        {articles.map(article => (
            <ArticleCard key={article.id} article={article} onClick={() => onArticleClick(article)} />
        ))}
    </div>
);

export default ArticleList;