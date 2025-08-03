import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import styles from '../AdminCRUD.module.css';
import Modal from '../Modal/Modal';
import CourseForm from './CourseForm';

interface Course {
    id: string;
    title: string;
    institution: string;
    completionDate: string;
    certificateUrl?: string;
}

function CourseManagement() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await api.get<Course[]>('/journey/courses');
            setCourses(response.data);
        } catch (error) {
            console.error("Falha ao buscar cursos", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (id: string) => {
        const promise = api.delete(`/journey/courses/${id}`).then(() => fetchCourses());
        toast.promise(promise, {
            pending: 'Excluindo curso...',
            success: 'Curso excluído com sucesso!',
            error: 'Erro ao excluir curso.',
        });
    };

    const handleOpenCreateModal = () => {
        setEditingCourse(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (course: Course) => {
        setEditingCourse(course);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCourse(null);
    };

    const handleFormSubmit = async (data: Omit<Course, 'id'>) => {
        setIsSubmitting(true);
        const promise = new Promise<void>(async (resolve, reject) => {
            try {
                if (editingCourse) {
                    await api.patch(`/journey/courses/${editingCourse.id}`, data);
                } else {
                    await api.post('/journey/courses', data);
                }
                handleCloseModal();
                fetchCourses();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
        toast.promise(promise, {
            pending: 'Salvando curso...',
            success: 'Curso salvo com sucesso!',
            error: 'Erro ao salvar curso.',
        }).finally(() => setIsSubmitting(false));
    };

    return (
        <>
            <div className={styles.tableContainer}>
                <div className={styles.header}>
                    <h3>Cursos Cadastrados</h3>
                    <button onClick={handleOpenCreateModal} className={styles.addButton}>Adicionar Novo</button>
                </div>
                {loading ? <p>Carregando...</p> : (
                    <table className={styles.techTable}>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Instituição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course.id}>
                                    <td>{course.title}</td>
                                    <td>{course.institution}</td>
                                    <td>
                                        <button onClick={() => handleOpenEditModal(course)} className={styles.actionButton}>Editar</button>
                                        <button onClick={() => handleDelete(course.id)} className={`${styles.actionButton} ${styles.deleteButton}`}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingCourse ? "Editar Curso" : "Adicionar Novo Curso"}>
                <CourseForm
                    onSubmit={handleFormSubmit}
                    isSubmitting={isSubmitting}
                    initialData={editingCourse}
                />
            </Modal>
        </>
    );
}

export default CourseManagement;