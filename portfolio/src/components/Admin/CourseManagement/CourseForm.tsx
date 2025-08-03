import { useState, useEffect } from 'react';
import styles from '../AdminCRUD.module.css';

interface CourseFormData {
    title: string;
    institution: string;
    completionDate: string;
    certificateUrl?: string;
}

interface CourseFormProps {
    initialData?: CourseFormData | null;
    onSubmit: (data: CourseFormData) => void;
    isSubmitting: boolean;
}

function CourseForm({ initialData, onSubmit, isSubmitting }: CourseFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        institution: '',
        completionDate: '',
        certificateUrl: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                institution: initialData.institution || '',
                completionDate: initialData.completionDate ? new Date(initialData.completionDate).toISOString().split('T')[0] : '',
                certificateUrl: initialData.certificateUrl || '',
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                <label htmlFor="title" className={styles.formLabel}>Título do Curso</label>
                <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="institution" className={styles.formLabel}>Instituição</label>
                <input id="institution" type="text" name="institution" value={formData.institution} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="completionDate" className={styles.formLabel}>Data de Conclusão</label>
                <input id="completionDate" type="date" name="completionDate" value={formData.completionDate} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="certificateUrl" className={styles.formLabel}>URL do Certificado (Opcional)</label>
                <input id="certificateUrl" type="url" name="certificateUrl" value={formData.certificateUrl} onChange={handleChange} />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
        </form>
    );
}

export default CourseForm;