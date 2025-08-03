import type { Book } from '../../types/journey';
import styles from '../JourneyCards.module.css';

interface BookCardProps {
    book: Book;
}

function BookCard({ book }: BookCardProps) {
    return (
        <div className={`${styles.card} ${styles.bookCard}`}>
            {book.coverUrl && <img src={book.coverUrl} alt={`Capa de ${book.title}`} className={styles.bookCover} />}
            <div className={styles.bookContent}>
                <h3 className={styles.cardTitle}>{book.title}</h3>
                <p className={styles.cardSubtitle}>{book.author}</p>
                <p className={styles.bookSummary}>{book.summary}</p>
            </div>
        </div>
    );
}

export default BookCard;