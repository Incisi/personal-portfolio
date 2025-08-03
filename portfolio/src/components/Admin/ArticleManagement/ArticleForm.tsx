import { useState, useEffect } from 'react';
import styles from '../AdminCRUD.module.css';

interface ArticleFormData {
    title: string;
    content: string;
}

interface ArticleFormProps {
    initialData?: ArticleFormData | null;
    onSubmit: (data: ArticleFormData) => void;
    isSubmitting: boolean;
}

function ArticleForm({ initialData, onSubmit, isSubmitting }: ArticleFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                content: initialData.content || '',
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
                <label htmlFor="title" className={styles.formLabel}>Título do Artigo</label>
                <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="content" className={styles.formLabel}>Conteúdo (Markdown)</label>
                <textarea id="content" name="content" value={formData.content} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
        </form>
    );
}

export default ArticleForm;