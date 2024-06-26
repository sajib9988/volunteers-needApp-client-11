import { 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from "firebase/auth";
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios'; // Make sure you have axios imported
import auth from './Firebase/firebase.config';

// 1. Create and Export Auth Context
export const AuthContext = createContext(null);

// 2. Initialize Providers
const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
    // 3. State Management
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 4. Auth Functions
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // const signInWithFacebook = () => {
    //     setLoading(true);
    //     return signInWithPopup(auth, facebookProvider);
    // }

    const logOut = async () => {
        setLoading(true);
        const { data } = await axios('http://localhost:5000/logout', {
          withCredentials: true,
        });
        console.log(data);
        await signOut(auth);
        setLoading(false);
    }

    const updateUserProfile = (displayName, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, { displayName, photoURL });
    }

    // 5. Effect to Observe Auth State Changes
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log("user in the auth state changed", currentUser);
          setUser(currentUser);
          setLoading(false);
        });
        return () => {
          unSubscribe();
        };
    }, []);
 
    // 6. Context Value
    const authInfo = { 
        user, 
        loading,
        createUser, 
        signInUser,
        signInWithGoogle,
        // signInWithFacebook,
        logOut,
        updateUserProfile
    }

    // 7. Return Provider with Context Value
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}
