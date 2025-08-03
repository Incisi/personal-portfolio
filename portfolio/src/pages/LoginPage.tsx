import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './LoginPage.module.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(username, password);
        } catch (err) {
            setError('Falha ao autenticar. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2>Admin Login</h2>
                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;