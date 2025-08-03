import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import styles from '../AdminCRUD.module.css';
import Modal from '../Modal/Modal';
import BookForm from './BookForm';

interface Book {
    id: string;
    title: string;
    author: string;
    coverUrl?: string;
    summary: string;
}

function BookManagement() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await api.get<Book[]>('/journey/books');
            setBooks(response.data);
        } catch (error) {
            console.error("Falha ao buscar livros", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (id: string) => {
        const promise = api.delete(`/journey/books/${id}`).then(() => fetchBooks());
        toast.promise(promise, {
            pending: 'Excluindo livro...',
            success: 'Livro excluído com sucesso!',
            error: 'Erro ao excluir livro.',
        });
    };

    const handleOpenCreateModal = () => {
        setEditingBook(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (book: Book) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBook(null);
    };

    const handleFormSubmit = async (data: Omit<Book, 'id'>) => {
        setIsSubmitting(true);
        const promise = new Promise<void>(async (resolve, reject) => {
            try {
                if (editingBook) {
                    await api.patch(`/journey/books/${editingBook.id}`, data);
                } else {
                    await api.post('/journey/books', data);
                }
                handleCloseModal();
                fetchBooks();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
        toast.promise(promise, {
            pending: 'Salvando livro...',
            success: 'Livro salvo com sucesso!',
            error: 'Erro ao salvar livro.',
        }).finally(() => setIsSubmitting(false));
    };

    return (
        <>
            <div className={styles.tableContainer}>
                <div className={styles.header}>
                    <h3>Livros Cadastrados</h3>
                    <button onClick={handleOpenCreateModal} className={styles.addButton}>Adicionar Novo</button>
                </div>
                {loading ? <p>Carregando...</p> : (
                    <table className={styles.techTable}>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>
                                        <button onClick={() => handleOpenEditModal(book)} className={styles.actionButton}>Editar</button>
                                        <button onClick={() => handleDelete(book.id)} className={`${styles.actionButton} ${styles.deleteButton}`}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingBook ? "Editar Livro" : "Adicionar Novo Livro"}>
                <BookForm
                    onSubmit={handleFormSubmit}
                    isSubmitting={isSubmitting}
                    initialData={editingBook}
                />
            </Modal>
        </>
    );
}

export default BookManagement;