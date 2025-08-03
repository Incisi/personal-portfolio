import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            const { access_token } = response.data;

            localStorage.setItem('authToken', access_token);
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            setToken(access_token);

            navigate('/admin');
        } catch (error) {
            console.error('Falha no login', error);
            throw new Error('Usuário ou senha inválidos.');
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        delete api.defaults.headers.common['Authorization'];
        setToken(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}