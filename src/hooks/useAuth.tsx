
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface User {
  username: string;
  role: 'admin' | 'traiteur';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This would ideally come from a secure backend or environment variable
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'racco2025';

// List of traiteurs (would ideally come from a database)
const TRAITEURS = [
  { username: 'traiteur1', password: 'traiteur2025', role: 'traiteur' as const },
  { username: 'traiteur2', password: 'traiteur2025', role: 'traiteur' as const },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for saved authentication on mount
    const savedAuth = localStorage.getItem('racco-auth');
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        setUser(parsedAuth);
      } catch (e) {
        localStorage.removeItem('racco-auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check admin credentials
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          const userData = { username, role: 'admin' as const };
          setUser(userData);
          localStorage.setItem('racco-auth', JSON.stringify(userData));
          setIsLoading(false);
          resolve();
          return;
        }
        
        // Check traiteur credentials
        const traiteur = TRAITEURS.find(
          t => t.username === username && t.password === password
        );
        
        if (traiteur) {
          const userData = { username, role: 'traiteur' as const };
          setUser(userData);
          localStorage.setItem('racco-auth', JSON.stringify(userData));
          setIsLoading(false);
          resolve();
          return;
        }
        
        // Invalid credentials
        setIsLoading(false);
        reject(new Error('Nom d\'utilisateur ou mot de passe incorrect'));
      }, 800); // Simulate API delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('racco-auth');
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Guard component to protect admin routes
export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login
      navigate('/admin/login', { 
        state: { from: location.pathname },
        replace: true 
      });
    }
  }, [user, isLoading, navigate, location]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return user ? <>{children}</> : null;
};
