import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { supabase } from "../../lib/supabaseClient";
import { API_BASE_URL } from "../../api/apiBase";

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const createUser = async (email, password) => {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            throw error;
        }
        return { user: data.user };
    };

    const signInUser = async (email, password) => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            throw error;
        }
        return { user: data.user };
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google" });
        if (error) {
            throw error;
        }
        return data;
    };

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            const currentUser = session?.user || null;
            setUser(currentUser);
            setLoading(false);

            if (currentUser?.email) {
                const userData = { email: currentUser.email };
                axios.post(`${API_BASE_URL}/jwt`, userData, {
                    withCredentials: true
                })
                    .catch(error => console.log(error));
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signOutUser = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
    };

    const authInfo = {
        loading,
        user,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;