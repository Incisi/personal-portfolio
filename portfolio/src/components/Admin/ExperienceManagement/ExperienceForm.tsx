import { useState, useEffect } from 'react';
import styles from '../AdminCRUD.module.css';

interface ExperienceFormData {
    role: string;
    company: string;
    period: string;
    description: string[];
    order: number;
}

interface ExperienceFormProps {
    initialData?: ExperienceFormData | null;
    onSubmit: (data: ExperienceFormData) => void;
    isSubmitting: boolean;
}

function ExperienceForm({ initialData, onSubmit, isSubmitting }: ExperienceFormProps) {
    const [formData, setFormData] = useState({
        role: '',
        company: '',
        period: '',
        description: '',
        order: 0,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                role: initialData.role || '',
                company: initialData.company || '',
                period: initialData.period || '',
                description: initialData.description?.join('\n') || '',
                order: initialData.order || 0,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            description: formData.description.split('\n').filter(line => line.trim() !== ''),
            order: Number(formData.order),
        });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.crudForm}>
            <div>
                <label htmlFor="order" className={styles.formLabel}>Ordem</label>
                <input id="order" type="number" name="order" value={formData.order} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="role" className={styles.formLabel}>Cargo</label>
                <input id="role" type="text" name="role" value={formData.role} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="company" className={styles.formLabel}>Empresa</label>
                <input id="company" type="text" name="company" value={formData.company} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="period" className={styles.formLabel}>Período</label>
                <input id="period" type="text" name="period" value={formData.period} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="description" className={styles.formLabel}>Descrição (uma por linha)</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
        </form>
    );
}

export default ExperienceForm;