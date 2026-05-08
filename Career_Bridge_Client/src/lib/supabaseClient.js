import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

const STORAGE_KEY = "career_bridge_local_auth";

const readLocalAuth = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { users: [], session: null };
};

const writeLocalAuth = (state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event("career-bridge-local-auth"));
};

const createLocalUser = (email) => ({
    id: crypto.randomUUID(),
    email,
    user_metadata: {}
});

const localAuthClient = {
    auth: {
        async signUp({ email, password }) {
            const state = readLocalAuth();
            const existingUser = state.users.find((item) => item.email === email);
            if (existingUser) {
                const error = new Error("User already exists");
                error.code = "user_already_exists";
                throw error;
            }

            const user = createLocalUser(email);
            const nextState = {
                users: [...state.users, { ...user, password }],
                session: { user }
            };
            writeLocalAuth(nextState);
            return { data: { user, session: nextState.session }, error: null };
        },

        async signInWithPassword({ email, password }) {
            const state = readLocalAuth();
            let storedUser = state.users.find((item) => item.email === email && item.password === password);

            if (!storedUser && state.users.length === 0) {
                storedUser = { ...createLocalUser(email), password };
                state.users.push(storedUser);
            }

            if (!storedUser) {
                const error = new Error("Invalid login credentials");
                error.code = "invalid_credentials";
                throw error;
            }

            const { password: _password, ...user } = storedUser;
            const nextState = { ...state, session: { user } };
            writeLocalAuth(nextState);
            return { data: { user, session: nextState.session }, error: null };
        },

        async signInWithOAuth() {
            const state = readLocalAuth();
            const email = "demo@careerbridge.local";
            let storedUser = state.users.find((item) => item.email === email);

            if (!storedUser) {
                storedUser = { ...createLocalUser(email), password: "" };
                state.users.push(storedUser);
            }

            const { password: _password, ...user } = storedUser;
            const nextState = { ...state, session: { user } };
            writeLocalAuth(nextState);
            return { data: { user, session: nextState.session }, error: null };
        },

        onAuthStateChange(callback) {
            const notify = () => {
                const state = readLocalAuth();
                callback("SIGNED_IN", state.session);
            };

            queueMicrotask(notify);
            window.addEventListener("career-bridge-local-auth", notify);

            return {
                data: {
                    subscription: {
                        unsubscribe() {
                            window.removeEventListener("career-bridge-local-auth", notify);
                        }
                    }
                }
            };
        },

        async signOut() {
            const state = readLocalAuth();
            writeLocalAuth({ ...state, session: null });
            return { error: null };
        }
    }
};

export const supabase = hasSupabaseConfig
    ? createClient(supabaseUrl, supabaseAnonKey)
    : localAuthClient;
