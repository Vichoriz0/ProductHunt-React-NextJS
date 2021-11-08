import React from 'react'

/* Components & Hooks*/
import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails';
import useProducts from '../hooks/useProducts';


export default function Home() {

  const { products } = useProducts('createdAt');

  return (
    <div>
      <Layout>
        <div className="products-list">
          <div className="container">
            <ul className="bg-white">

              {products.map(product => (
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
