import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from '../firebase'
import { supabase } from '../supabaseClient'




export class AuthService {

    constructor() {
        // this.auth = getAuth(app);
    }

    async createAccount({ email, password, name }) {
        try {
            // const userAccount = await this.account.create(ID.unique(), email, password, name);
            // const userAccount = await createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => userCredential.user).then((user) => user.displayName = name)



            // return userAccount;

            return await supabase.auth.signUp({ email, password })

        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {

        try {
            // return await signInWithEmailAndPassword(this.auth, email, password)
            return await supabase.auth.signInWithPassword({email, password})
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            // return await this.account.get();
            // onAuthStateChanged(this.auth, user => {
            //     if (user) {
            //         // user.displayName = 'amita'
            //         console.log(user.displayName);

            //         return await user;
            //     }
            //     else {
            //         return 'user not logged in';
            //     }

            // })

            const user = await supabase.auth.getSession();

            if (user) {
                // console.log(user.data.session.user.id);
                
                return user.data.session.user.id
            }


        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error ", error);

        }

        return null;
    }

    async logout() {
        try {
            // await signOut(this.auth) //.then(() => console.log("user Signed out successfully..."))

            await supabase.auth.signOut({scope: 'global'});
        } catch (error) {
            console.log("Appwrite Service :: logout :: error ", error);

        }
    }
}

const authService = new AuthService

export default authService