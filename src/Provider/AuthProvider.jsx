import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.init";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signoutUser = () => {
        return signOut(auth)
    }

    // Check if any user is logged in
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, currentUser => {
            console.log('Current State : ', currentUser?.email)

            if (currentUser?.email) {
                setUser(currentUser);
                setLoading(false);
                const profile={
                    email: currentUser?.email,
                    name: currentUser?.displayName,
                }
                axios.post(`http://localhost:5000/user/:email`,profile)
                .then(res=> {
                    console.log(res.data)
                    
                })


            }
            else {
                setUser(null);
                setLoading(false);

            }
        })

        return () => {
            unsubcribe()
        }
    }, [])

    const authvalue = {
        loginUser,
        registerUser,
        signoutUser,
        user,
        setUser,
        loading,
        setLoading
    }
    return (
        <AuthContext.Provider value={authvalue}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;