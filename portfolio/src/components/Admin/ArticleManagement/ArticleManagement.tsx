import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import styles from '../AdminCRUD.module.css';
import Modal from '../Modal/Modal';
import ArticleForm from './ArticleForm';

interface Article {
    id: string;
    title: string;
    content: string;
    createdAt: string;
}

function ArticleManagement() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const response = await api.get<Article[]>('/journey/articles');
            setArticles(response.data);
        } catch (error) {
            console.error("Falha ao buscar artigos", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleDelete = async (id: string) => {
        const promise = api.delete(`/journey/articles/${id}`).then(() => fetchArticles());
        toast.promise(promise, {
            pending: 'Excluindo artigo...',
            success: 'Artigo excluído com sucesso!',
            error: 'Erro ao excluir artigo.',
        });
    };

    const handleOpenCreateModal = () => {
        setEditingArticle(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (article: Article) => {
        setEditingArticle(article);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingArticle(null);
    };

    const handleFormSubmit = async (data: Omit<Article, 'id' | 'createdAt'>) => {
        setIsSubmitting(true);
        const promise = new Promise<void>(async (resolve, reject) => {
            try {
                if (editingArticle) {
                    await api.patch(`/journey/articles/${editingArticle.id}`, data);
                } else {
                    await api.post('/journey/articles', data);
                }
                handleCloseModal();
                fetchArticles();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
        toast.promise(promise, {
            pending: 'Salvando artigo...',
            success: 'Artigo salvo com sucesso!',
            error: 'Erro ao salvar artigo.',
        }).finally(() => setIsSubmitting(false));
    };

    return (
        <>
            <div className={styles.tableContainer}>
                <div className={styles.header}>
                    <h3>Artigos Publicados</h3>
                    <button onClick={handleOpenCreateModal} className={styles.addButton}>Adicionar Novo</button>
                </div>
                {loading ? <p>Carregando...</p> : (
                    <table className={styles.techTable}>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Publicado em</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map(article => (
                                <tr key={article.id}>
                                    <td>{article.title}</td>
                                    <td>{new Date(article.createdAt).toLocaleDateString('pt-BR')}</td>
                                    <td>
                                        <button onClick={() => handleOpenEditModal(article)} className={styles.actionButton}>Editar</button>
                                        <button onClick={() => handleDelete(article.id)} className={`${styles.actionButton} ${styles.deleteButton}`}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingArticle ? "Editar Artigo" : "Adicionar Novo Artigo"}>
                <ArticleForm
                    onSubmit={handleFormSubmit}
                    isSubmitting={isSubmitting}
                    initialData={editingArticle}
                />
            </Modal>
        </>
    );
}

export default ArticleManagement;