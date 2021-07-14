import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
    { id: 'p1', price: 6, title: 'A Book', description: 'vmxap' },
    { id: 'p2', price: 3, title: 'Another Book', description: 'lknsd' },
    { id: 'p3', price: 10, title: 'the other Book', description: 'csamwfk' },
];

const Products = props => {
    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>
                {DUMMY_PRODUCTS.map(product => (
                    <ProductItem
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Products;
