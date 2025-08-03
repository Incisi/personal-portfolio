import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Course, Book, Article } from '../types/journey';
import styles from './JourneyPage.module.css';
import CourseList from '../components/CourseList/CourseList';
import BookList from '../components/BookList/BookList';
import ArticleList from '../components/ArticleList/ArticleList';

function JourneyPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchJourneyData() {
            try {
                setLoading(true);
                const [coursesRes, booksRes, articlesRes] = await Promise.all([
                    api.get('/journey/courses'),
                    api.get('/journey/books'),
                    api.get('/journey/articles'),
                ]);
                setCourses(coursesRes.data);
                setBooks(booksRes.data);
                setArticles(articlesRes.data);
            } catch (error) {
                console.error("Falha ao buscar dados da jornada", error);
            } finally {
                setLoading(false);
            }
        }
        fetchJourneyData();
    }, []);

    if (loading) {
        return <div className={styles.container}><p>Carregando jornada...</p></div>;
    }

    return (
        <main className={styles.container}>
            <h1>Minha Jornada de Aprendizado</h1>

            <section>
                <h2>Cursos e Certificações</h2>
                {courses.length > 0 ? <CourseList courses={courses} /> : <p>Nenhum curso cadastrado ainda.</p>}
            </section>

            <section>
                <h2>Livros que Moldaram meu Pensamento</h2>
                {books.length > 0 ? <BookList books={books} /> : <p>Nenhum livro cadastrado ainda.</p>}
            </section>

            <section>
                <h2>Diário de Bordo (Artigos)</h2>
                {articles.length > 0 ? (
                    <ArticleList articles={articles} />
                ) : <p>Nenhum artigo publicado ainda.</p>}
            </section>
        </main>
    );
}

export default JourneyPage;