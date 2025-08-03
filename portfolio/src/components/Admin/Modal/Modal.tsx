import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <header className={styles.modalHeader}>
                    <h2>{title}</h2>
                    <button onClick={onClose} className={styles.closeButton}>&times;</button>
                </header>
                <main className={styles.modalBody}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Modal;