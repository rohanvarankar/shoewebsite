'use client'
import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [open, setOpen] = useState(true);
    const [products, setProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setProducts(parsedCart);
            if (parsedCart.length === 0) {
                return <div>Cart is Empty!!</div>;
            }
        }
    }, []);

    const removeItem = (productId) => {
        const updatedProducts = products.filter(p => p.id !== productId);
        setProducts(updatedProducts);
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
    };

    const totalPrice = products.price;

    return (
        <div className="mt-10 mb-10 overflow-hidden flex items-center justify-center">
            <div className="bg-white shadow-xl border-2 border-gray-300 p-6 rounded-lg w-full max-w-3xl">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-medium text-gray-900">Shopping cart</div>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative p-2 text-gray-400 hover:text-gray-500"
                    >
                        <span className="sr-only">Close panel</span>
                        <IoClose aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>

                <div className="mt-8">
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                            {products.map((product) => (
                                <li key={product.id} className="flex py-6 justify-center">
                                    <div className="flex items-center border border-gray-200 rounded-lg p-4 w-full">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                alt={product.imageAlt}
                                                src={product.imageSrc}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href={product.href}>{product.name}</a>
                                                    </h3>
                                                    <p className="ml-4">{product.price}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">Size {product.size}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">Qty {product.quantity}</p>

                                                <div className="flex">
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => removeItem(product.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{totalPrice}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <button
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Checkout
                        </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p
                            onClick={() => window.location.href = '/ShoeList'}
                            className='font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer'
                        >
                            Continue Shopping <span aria-hidden="true"> &rarr;</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
