import type { Course } from '../../types/journey';
import styles from '../JourneyCards.module.css';

interface CourseCardProps {
    course: Course;
}

function CourseCard({ course }: CourseCardProps) {
    const formattedDate = new Date(course.completionDate).toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>{course.title}</h3>
            <p className={styles.cardSubtitle}>{course.institution}</p>
            <p className={styles.cardDate}>{formattedDate}</p>
            {course.certificateUrl && (
                <a href={course.certificateUrl} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                    Ver Certificado
                </a>
            )}
        </div>
    );
}

export default CourseCard;