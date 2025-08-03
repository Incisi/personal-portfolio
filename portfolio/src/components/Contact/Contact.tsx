import { useState } from 'react';
import { api } from '../../services/api';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('sending');
        try {
            await api.post('/contact/send', { name, email, message });
            setStatus('success');
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            setStatus('error');
            console.error(error);
        }
    };

    return (
        <motion.section
            id="contact"
            className={styles.contactSection}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h2>Contato</h2>
            <p>Gostou do que viu? Vamos conversar. Me envie uma mensagem!</p>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div>
                    <label htmlFor="name" className={styles.formLabel}>Seu Nome</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className={styles.formLabel}>Seu E-mail</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className={styles.formLabel}>Sua Mensagem</label>
                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
            </form>
            {status === 'success' && <p className={styles.successMessage}>Mensagem enviada com sucesso! Obrigado.</p>}
            {status === 'error' && <p className={styles.errorMessage}>Ocorreu um erro. Tente novamente mais tarde.</p>}
        </motion.section>
    );
}

export default Contact;