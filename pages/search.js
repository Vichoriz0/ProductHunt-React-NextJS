import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';

/* Components & Hooks */
import ProductDetails from '../components/layout/ProductDetails';
import useProducts from '../hooks/useProducts';

const SearchPage = () => {

    // Obtener el término de búsqueda a través del query del router
    const router = useRouter();
    const { query: { q } } = router;

    // Obtener listado de productos
    const { products } = useProducts('votes');

    // State para el resultado de la búsqueda
    const [result, setResult] = useState([]);

    useEffect(() => {
        const filtered = products.filter( product => {
            return (
                product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q)
            );
        });

        setResult(filtered);
    }, [q, products]);

    return (
        <div>
            <Layout>
                <div className="products-list">
                <div className="container">
                    <ul className="bg-white">

                    {result.map(product => (
                        <ProductDetails 
                            key={product.id}
                            product={product}
                        />
                    ))}

                    </ul>
                </div>
                </div>
            </Layout>
        </div>
    );
}
 
export default SearchPage;