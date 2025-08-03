import { useState } from 'react';
import { api } from '../../services/api';
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
        <section className={styles.contactSection}>
            <h2>Contato</h2>
            <p>Gostou do que viu? Vamos conversar. Me envie uma mensagem!</p>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
                <input
                    type="text"
                    placeholder="Seu Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Seu E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Sua Mensagem"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
            </form>
            {status === 'success' && <p className={styles.successMessage}>Mensagem enviada com sucesso! Obrigado.</p>}
            {status === 'error' && <p className={styles.errorMessage}>Ocorreu um erro. Tente novamente mais tarde.</p>}
        </section>
    );
}

export default Contact;