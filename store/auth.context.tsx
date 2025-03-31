import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { onUserAuthStateChanged } from '../services/auth.service';

import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthContextProps {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
  setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  initializing: true,
  setUser: () => null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onUserAuthStateChanged((usr) => {
      setUser(usr);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [initializing]);

  return (
    <AuthContext.Provider value={{ user, setUser, initializing }}>{children}</AuthContext.Provider>
  );
};
