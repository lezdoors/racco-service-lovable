
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// Define user roles as a type for better type safety
type UserRole = 'admin' | 'traiteur';

interface User {
  username: string;
  role: UserRole;
  fullName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a production environment, these would come from a secure backend
// This implementation is for demonstration purposes only
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'racco2025';

// These would be stored in a database in a real application
const VALID_USERS = [
  { username: ADMIN_USERNAME, password: ADMIN_PASSWORD, role: 'admin' as UserRole, fullName: 'Administrateur' },
  { username: 'traiteur1', password: 'traiteur2025', role: 'traiteur' as UserRole, fullName: 'Traiteur Principal' },
  { username: 'traiteur2', password: 'traiteur2025', role: 'traiteur' as UserRole, fullName: 'Traiteur Secondaire' },
];

// Token expiration time in milliseconds (24 hours)
const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for saved authentication on mount and validate token expiration
    const savedAuth = localStorage.getItem('racco-auth');
    if (savedAuth) {
      try {
        const { user, expiry } = JSON.parse(savedAuth);
        
        // Check if token has expired
        if (expiry && new Date().getTime() < expiry) {
          setUser(user);
        } else {
          // Token expired, remove it
          localStorage.removeItem('racco-auth');
          toast({
            title: "Session expirée",
            description: "Veuillez vous reconnecter.",
            variant: "destructive",
          });
        }
      } catch (e) {
        // Invalid auth data, remove it
        localStorage.removeItem('racco-auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // In a real app, this would be an API call with rate limiting and security measures
    return new Promise((resolve, reject) => {
      // Simulate API delay
      setTimeout(() => {
        try {
          // Find matching user
          const matchedUser = VALID_USERS.find(
            u => u.username === username && u.password === password
          );
          
          if (matchedUser) {
            // Never store passwords in client storage!
            const userData = {
              username: matchedUser.username,
              role: matchedUser.role,
              fullName: matchedUser.fullName
            };
            
            // Set expiration time
            const expiry = new Date().getTime() + TOKEN_EXPIRATION;
            
            // Store auth data with expiration
            localStorage.setItem('racco-auth', JSON.stringify({ user: userData, expiry }));
            setUser(userData);
            
            toast({
              title: "Connexion réussie",
              description: `Bienvenue, ${userData.fullName || userData.username}!`,
            });
            
            setIsLoading(false);
            resolve();
          } else {
            setIsLoading(false);
            reject(new Error('Nom d\'utilisateur ou mot de passe incorrect'));
          }
        } catch (error) {
          setIsLoading(false);
          reject(new Error('Une erreur est survenue lors de la connexion'));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('racco-auth');
    navigate('/admin/login');
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading,
      isAuthenticated: !!user 
    }}>
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
  const { user, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login with current location for redirect after login
      navigate('/admin/login', { 
        state: { from: location.pathname },
        replace: true 
      });
    }
  }, [user, isLoading, isAuthenticated, navigate, location]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 border-4 border-t-enedis-blue border-r-enedis-blue border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};
