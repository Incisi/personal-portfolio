import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import { TechIcon } from '../../../utils/IconMapper';
import styles from '../AdminCRUD.module.css';
import Modal from '../Modal/Modal';
import TechForm from './TechForm';

interface Technology {
    id: string;
    name: string;
    category: string;
    iconName: string;
    description: string;
}

function TechManagement() {
    const [techs, setTechs] = useState<Technology[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTech, setEditingTech] = useState<Technology | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchTechs = async () => {
        setLoading(true);
        try {
            const response = await api.get<Technology[]>('/journey/tech-stack');
            setTechs(response.data);
        } catch (error) {
            console.error("Falha ao buscar tecnologias", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTechs();
    }, []);

    const handleDelete = async (id: string) => {
        const promise = new Promise<void>(async (resolve, reject) => {
            try {
                await api.delete(`/journey/tech-stack/${id}`);
                fetchTechs();
                resolve();
            } catch (error) {
                reject(error);
            }
        });

        toast.promise(promise, {
            pending: 'Excluindo tecnologia...',
            success: 'Tecnologia excluída com sucesso!',
            error: 'Erro ao excluir tecnologia.',
        });
    };

    const handleOpenCreateModal = () => {
        setEditingTech(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (tech: Technology) => {
        setEditingTech(tech);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTech(null);
    };

    const handleFormSubmit = async (data: Omit<Technology, 'id'>) => {
        setIsSubmitting(true);

        const promise = new Promise<void>(async (resolve, reject) => {
            try {
                if (editingTech) {
                    await api.patch(`/journey/tech-stack/${editingTech.id}`, data);
                } else {
                    await api.post('/journey/tech-stack', data);
                }
                handleCloseModal();
                fetchTechs();
                resolve();
            } catch (error) {
                reject(error);
            }
        });

        toast.promise(promise, {
            pending: 'Salvando tecnologia...',
            success: 'Tecnologia salva com sucesso!',
            error: 'Erro ao salvar tecnologia.',
        }).finally(() => setIsSubmitting(false));
    };

    return (
        <>
            <div className={styles.tableContainer}>
                <div className={styles.header}>
                    <h3>Tecnologias Cadastradas</h3>
                    <button onClick={handleOpenCreateModal} className={styles.addButton}>Adicionar Nova</button>
                </div>
                {loading ? <p>Carregando...</p> : (
                    <table className={styles.techTable}>
                        <thead>
                            <tr>
                                <th>Ícone</th>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {techs.map(tech => (
                                <tr key={tech.id}>
                                    <td><TechIcon iconName={tech.iconName} /></td>
                                    <td>{tech.name}</td>
                                    <td>{tech.category}</td>
                                    <td>
                                        <button onClick={() => handleOpenEditModal(tech)} className={styles.actionButton}>Editar</button>
                                        <button onClick={() => handleDelete(tech.id)} className={`${styles.actionButton} ${styles.deleteButton}`}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingTech ? "Editar Tecnologia" : "Adicionar Nova Tecnologia"}>
                <TechForm
                    onSubmit={handleFormSubmit}
                    isSubmitting={isSubmitting}
                    initialData={editingTech}
                />
            </Modal>
        </>
    );
}

export default TechManagement;