import { useState, useEffect } from 'react';
import { ICONS, TechIcon } from '../../../utils/IconMapper';
import styles from '../AdminCRUD.module.css';

interface TechFormData {
    name: string;
    category: string;
    iconName: string;
    description: string;
}

interface TechFormProps {
    initialData?: TechFormData | null;
    onSubmit: (data: TechFormData) => void;
    isSubmitting: boolean;
}

function TechForm({ initialData, onSubmit, isSubmitting }: TechFormProps) {
    const [formData, setFormData] = useState<TechFormData>({
        name: '',
        category: '',
        iconName: '',
        description: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
                <label htmlFor="name" className={styles.formLabel}>Nome da Tecnologia</label>
                <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="category" className={styles.formLabel}>Categoria</label>
                <input id="category" type="text" name="category" value={formData.category} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="description" className={styles.formLabel}>Descrição</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="iconName" className={styles.formLabel}>Ícone</label>
                <div className={styles.iconSelector}>
                    <select id="iconName" name="iconName" value={formData.iconName} onChange={handleChange} required>
                        <option value="" disabled>Selecione um Ícone</option>
                        {Object.keys(ICONS).sort().map(iconKey => (
                            <option key={iconKey} value={iconKey}>{iconKey}</option>
                        ))}
                    </select>
                    {formData.iconName && <TechIcon iconName={formData.iconName} />}
                </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
        </form>
    );
}

export default TechForm;