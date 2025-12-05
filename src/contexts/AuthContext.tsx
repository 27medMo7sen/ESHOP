import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, User } from '@/lib/db';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize database and restore session
    useEffect(() => {
        const initAuth = async () => {
            try {
                await db.init();

                // Restore session from localStorage
                const savedUser = localStorage.getItem('currentUser');
                if (savedUser) {
                    const userData = JSON.parse(savedUser);
                    // Verify user still exists in database
                    const dbUser = await db.getUserByEmail(userData.email);
                    if (dbUser) {
                        setUser(dbUser);
                    } else {
                        localStorage.removeItem('currentUser');
                    }
                }
            } catch (error) {
                console.error('Failed to initialize auth:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const verifiedUser = await db.verifyUser(email, password);

            if (verifiedUser) {
                // Don't store password hash in localStorage
                const { passwordHash, ...userWithoutPassword } = verifiedUser;
                setUser(verifiedUser);
                localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

                toast({
                    title: "Welcome back!",
                    description: `Logged in as ${verifiedUser.name}`,
                });

                return true;
            } else {
                toast({
                    title: "Login failed",
                    description: "Invalid email or password",
                    variant: "destructive",
                });
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            toast({
                title: "Login error",
                description: "An error occurred during login",
                variant: "destructive",
            });
            return false;
        }
    };

    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        try {
            // Check if user already exists
            const existingUser = await db.getUserByEmail(email);
            if (existingUser) {
                toast({
                    title: "Registration failed",
                    description: "An account with this email already exists",
                    variant: "destructive",
                });
                return false;
            }

            const newUser = await db.createUser(name, email, password);
            const { passwordHash, ...userWithoutPassword } = newUser;

            setUser(newUser);
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

            toast({
                title: "Account created!",
                description: `Welcome, ${newUser.name}!`,
            });

            return true;
        } catch (error) {
            console.error('Registration error:', error);
            toast({
                title: "Registration error",
                description: "An error occurred during registration",
                variant: "destructive",
            });
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        toast({
            title: "Logged out",
            description: "You have been logged out successfully",
        });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >
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
