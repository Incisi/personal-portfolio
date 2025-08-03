import type { Article } from '../../types/journey';
import ArticleCard from '../ArticleCard/ArticleCard';
import styles from '../JourneyLists.module.css';

const ArticleList = ({ articles }: { articles: Article[] }) => (
    <div className={styles.grid}>
        {articles.map(article => <ArticleCard key={article.id} article={article} />)}
    </div>
);

export default ArticleList;