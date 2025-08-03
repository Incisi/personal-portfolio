import { useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import styles from './AdminDashboardPage.module.css';
import TechManagement from "../components/Admin/TechManagement/TechManagement";
import ExperienceManagement from '../components/Admin/ExperienceManagement/ExperienceManagement';
import CourseManagement from '../components/Admin/CourseManagement/CourseManagement';
import BookManagement from '../components/Admin/BookManagement/BookManagement';
import ArticleManagement from '../components/Admin/ArticleManagement/ArticleManagement';

type AdminView = 'tech' | 'experience' | 'courses' | 'books' | 'articles';

function AdminDashboardPage() {
    const { logout } = useAuth();
    const [currentView, setCurrentView] = useState<AdminView>('tech');

    const renderCurrentView = () => {
        switch (currentView) {
            case 'tech':
                return <TechManagement />;
            case 'experience':
                return <ExperienceManagement />;
            case 'courses':
                return <CourseManagement />;
            case 'books':
                return <BookManagement />;
            case 'articles':
                return <ArticleManagement />;
            default:
                return <TechManagement />;
        }
    }

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Admin Dashboard</h1>
                <button onClick={logout} className={styles.logoutButton}>Sair</button>
            </header>

            <nav className={styles.adminNav}>
                <button onClick={() => setCurrentView('tech')}>Tecnologias</button>
                <button onClick={() => setCurrentView('experience')}>Experiências</button>
                <button onClick={() => setCurrentView('courses')}>Cursos</button>
                <button onClick={() => setCurrentView('books')}>Livros</button>
                <button onClick={() => setCurrentView('articles')}>Artigos</button>
            </nav>

            <main className={styles.mainContent}>
                {renderCurrentView()}
            </main>
        </div>
    );
}

export default AdminDashboardPage;