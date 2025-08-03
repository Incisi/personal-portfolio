import type { Course } from '../../types/journey';
import CourseCard from '../CourseCard/CourseCard';
import styles from '../JourneyLists.module.css';

const CourseList = ({ courses }: { courses: Course[] }) => (
    <div className={styles.grid}>
        {courses.map(course => <CourseCard key={course.id} course={course} />)}
    </div>
);

export default CourseList;