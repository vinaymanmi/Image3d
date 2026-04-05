import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isDemoMode = auth.app.options.apiKey === 'demo-key';

  function signUp(email, username, password) {
    if (isDemoMode) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const users = JSON.parse(localStorage.getItem('depthlens_users') || '{}');
          if (users[username]) {
            reject(new Error("Username is already taken."));
            return;
          }
          users[username] = { email, password };
          localStorage.setItem('depthlens_users', JSON.stringify(users));
          resolve();
        }, 800);
      });
    }
    const fakeEmail = `${username.toLowerCase()}@depthlens.auth`;
    return createUserWithEmailAndPassword(auth, fakeEmail, password);
  }

  function logIn(username, password) {
    if (isDemoMode) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const users = JSON.parse(localStorage.getItem('depthlens_users') || '{}');
          const storedUser = users[username];

          if (!storedUser) {
            reject(new Error("User not found. Please register first."));
            return;
          }
          if (storedUser.password !== password) {
            reject(new Error("Incorrect password."));
            return;
          }

          setUser({ email: storedUser.email, displayName: username });
          resolve();
        }, 800);
      });
    }
    const fakeEmail = `${username.toLowerCase()}@depthlens.auth`;
    return signInWithEmailAndPassword(auth, fakeEmail, password);
  }

  function logOut() {
    if (isDemoMode) {
      return new Promise((resolve) => { setUser(null); resolve(); });
    }
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
