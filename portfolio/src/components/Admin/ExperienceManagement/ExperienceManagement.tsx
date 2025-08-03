import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import styles from '../AdminCRUD.module.css';
import Modal from '../Modal/Modal';
import ExperienceForm from './ExperienceForm';

interface Experience {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string[];
    order: number;
}

function ExperienceManagement() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchExperiences = async () => {
        setLoading(true);
        try {
            const response = await api.get<Experience[]>('/journey/experiences');
            setExperiences(response.data);
        } catch (error) {
            console.error("Falha ao buscar experiências", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    const handleDelete = async (id: string) => {
        const promise = api.delete(`/journey/experiences/${id}`).then(() => {
            fetchExperiences();
        });

        toast.promise(promise, {
            pending: 'Excluindo experiência...',
            success: 'Experiência excluída com sucesso!',
            error: 'Erro ao excluir experiência.',
        });
    };

    const handleOpenCreateModal = () => {
        setEditingExperience(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (exp: Experience) => {
        setEditingExperience(exp);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingExperience(null);
    };

    const handleFormSubmit = async (data: Omit<Experience, 'id'>) => {
        setIsSubmitting(true);

        const promise = new Promise<void>(async (resolve, reject) => {
            try {
                if (editingExperience) {
                    await api.patch(`/journey/experiences/${editingExperience.id}`, data);
                } else {
                    await api.post('/journey/experiences', data);
                }
                handleCloseModal();
                fetchExperiences();
                resolve();
            } catch (error) {
                reject(error);
            }
        });

        toast.promise(promise, {
            pending: 'Salvando experiência...',
            success: 'Experiência salva com sucesso!',
            error: 'Erro ao salvar experiência.',
        }).finally(() => setIsSubmitting(false));
    };

    return (
        <>
            <div className={styles.tableContainer}>
                <div className={styles.header}>
                    <h3>Experiências Cadastradas</h3>
                    <button onClick={handleOpenCreateModal} className={styles.addButton}>Adicionar Nova</button>
                </div>
                {loading ? <p>Carregando...</p> : (
                    <table className={styles.techTable}>
                        <thead>
                            <tr>
                                <th>Ordem</th>
                                <th>Cargo</th>
                                <th>Empresa</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {experiences.map(exp => (
                                <tr key={exp.id}>
                                    <td>{exp.order}</td>
                                    <td>{exp.role}</td>
                                    <td>{exp.company}</td>
                                    <td>
                                        <button onClick={() => handleOpenEditModal(exp)} className={styles.actionButton}>Editar</button>
                                        <button onClick={() => handleDelete(exp.id)} className={`${styles.actionButton} ${styles.deleteButton}`}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingExperience ? "Editar Experiência" : "Adicionar Nova Experiência"}>
                <ExperienceForm
                    onSubmit={handleFormSubmit}
                    isSubmitting={isSubmitting}
                    initialData={editingExperience}
                />
            </Modal>
        </>
    );
}

export default ExperienceManagement;