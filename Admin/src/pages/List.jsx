import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const List = ({ token }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/product/remove`,
                { id },
                { headers: { token } }
            );
            if (response.data.success) {
                toast.success(response.data.message);
                fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="w-full px-4">
            <p className="text-xl font-semibold mb-4">All Products</p>

            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] font-semibold text-gray-700 bg-gray-100 border-b py-3 px-2">
                <p>Image</p>
                <p>Name</p>
                <p>Category</p>
                <p>Price</p>
                <p className="text-center">Action</p>
            </div>

            {/* Product List */}
            <div className="flex flex-col divide-y">
                {list.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-3 md:gap-2 py-4 md:py-3 items-center text-sm md:text-base">
                       
                        <div className="flex justify-center md:justify-start">
                            <img
                                src={item.image[0]}
                                alt="product"
                                className="w-16 h-16 object-cover rounded-md border"
                            />
                        </div>
                        <p className="truncate text-center md:text-left">{item.name}</p>
                        <p className="text-center md:text-left">{item.category}</p>
                        <p className="text-center md:text-left">
                            {currency} {item.price}
                        </p>

                        <div className="flex justify-center">
                            <img
                                src={assets.delete_icon}
                                alt="delete"
                                onClick={() => removeProduct(item._id)}
                                className="w-8 h-8 cursor-pointer hover:scale-105 transition-transform"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
