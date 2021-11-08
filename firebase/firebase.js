import { initializeApp } from 'firebase/app';
import { getStorage } from '@firebase/storage';
import { getFirestore, 
        collection, 
        addDoc, 
        query, 
        orderBy, 
        getDocs, 
        getDoc, 
        doc, 
        updateDoc,
        deleteDoc
} from 'firebase/firestore';
import { getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        updateProfile,
        signOut
} from 'firebase/auth';

import firebaseConfig from './config';


class Firebase {
    constructor() {
        // Inicializa Firebase
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth();
        this.db = getFirestore();
        this.storage = getStorage(this.app);
    }

    // Registrar un usuario
    async register(name, email, password) {
        const newUser = await createUserWithEmailAndPassword(this.auth, email, password);
        return await updateProfile(newUser.user, {
            displayName: name
        });
    }

    // Iniciar sesión
    async login(email, password) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    // Cerrar sesión
    async logout() {
        await signOut(this.auth);
    }

    // Agregar un nuevo producto
    async addProduct(product) {
        const coll = collection(this.db, 'products');
        return await addDoc(coll, product);
    }

    // Obtener los productos
    async getProducts(att) {
        const productsRef = collection(this.db, 'products');
        const q = query(productsRef, orderBy(att, 'desc'));

        let result = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            result.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return result;
    }

    // Obtener un producto
    async getProduct(id) {
        const docRef = doc(this.db, 'products', id);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    }

    // Actualizar un producto
    async putProduct(id, product) {
        const docRef = doc(this.db, 'products', id);
        await updateDoc(docRef, product);
    }

    // Eliminar un producto
    async deleteProduct(id) {
        const docRef = doc(this.db, 'products', id);
        await deleteDoc(docRef);
    }
}

const firebase = new Firebase();
export default firebase;