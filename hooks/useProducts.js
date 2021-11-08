import { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../firebase';

const useProducts = order => {
    const [consultDB, setConsultDB] = useState(true);
    const [products, setProducts] = useState([]);

    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
        const getProducts = async () => {
            const p = await firebase.getProducts(order);
            setProducts(p);
        };

        if(consultDB) {
            getProducts();
            setConsultDB(false);
        }
    }, []);

    return {
        products
    }
};

export default useProducts;

