import type { Book } from '../../types/journey';
import BookCard from '../BookCard/BookCard';
import styles from '../JourneyLists.module.css';

const BookList = ({ books }: { books: Book[] }) => (
    <div className={styles.grid}>
        {books.map(book => <BookCard key={book.id} book={book} />)}
    </div>
);

export default BookList;