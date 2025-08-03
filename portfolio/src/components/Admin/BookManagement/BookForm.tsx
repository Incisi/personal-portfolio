import { useState, useEffect } from 'react';
import styles from '../AdminCRUD.module.css';

interface BookFormData {
    title: string;
    author: string;
    coverUrl?: string;
    summary: string;
}

interface BookFormProps {
    initialData?: BookFormData | null;
    onSubmit: (data: BookFormData) => void;
    isSubmitting: boolean;
}

function BookForm({ initialData, onSubmit, isSubmitting }: BookFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        coverUrl: '',
        summary: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                author: initialData.author || '',
                coverUrl: initialData.coverUrl || '',
                summary: initialData.summary || '',
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.crudForm}>
            <div>
                <label htmlFor="title" className={styles.formLabel}>Título do Livro</label>
                <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="author" className={styles.formLabel}>Autor</label>
                <input id="author" type="text" name="author" value={formData.author} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="coverUrl" className={styles.formLabel}>URL da Capa (Opcional)</label>
                <input id="coverUrl" type="url" name="coverUrl" value={formData.coverUrl} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="summary" className={styles.formLabel}>Resumo / Insight</label>
                <textarea id="summary" name="summary" value={formData.summary} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
        </form>
    );
}

export default BookForm;