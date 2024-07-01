import { useState, useEffect } from 'react';
import './App.css';
import { Spinner } from 'react-bootstrap';
import ImageData from './ImageData';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoader(true);
      try {
        const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoader(false);
      }
    };

    fetchProducts();
  }, []);

  const uniqueCategories = ['all'];
  products.forEach(product => {
    if (!uniqueCategories.includes(product.product_type)) {
      uniqueCategories.push(product.product_type);
    }
  });

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter((product) => product.product_type === category);

  return (
    <div>
      <header className="bg-primary text-center text-white p-3">
        <h1>Photo Gallery Website</h1>
      </header>
      <main>
        <div className="text-center">
          <select className="form-control w-25 m-auto text-center" onChange={(e) => setCategory(e.target.value)}>
            {uniqueCategories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center d-flex justify-content-center align-items-center">
          {loader && <Spinner animation="border" variant="danger" />}
        </div>
        <div className="colors">
          {filteredProducts.map((product, index) => (
            <ImageData key={index} imageDetails={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
