
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '@/lib/firebase';
import type { User as FirebaseUser } from 'firebase/auth';
import { getUser } from '@/lib/data';
import type { User } from '@/lib/types';


interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  dbUser: User | null;
  userRole: 'requester' | 'helper' | null;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, dbUser: null, userRole: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'requester' | 'helper' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async firebaseUser => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDoc = await getUser(firebaseUser.uid);
        setDbUser(userDoc);
        setUserRole(userDoc?.role || null);
      } else {
        setDbUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, dbUser, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
