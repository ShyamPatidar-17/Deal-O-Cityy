import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sizes: '',
    category: '',
    subCategory: '',
    bestseller: 'false',
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [loading, setLoading] = useState(true);

  // ✅ Load existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(`${backendUrl}/api/product/single`, { productId: id });
        const product = res.data.product;

        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          sizes: JSON.stringify(product.sizes || []),
          category: product.category || '',
          subCategory: product.subCategory || '',
          bestseller: product.bestseller ? 'true' : 'false',
        });

        setLoading(false);
      } catch (err) {
        console.error('Error loading product:', err);
        toast.error('Failed to load product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages({ ...images, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all fields
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Append images if provided
    Object.keys(images).forEach((key) => {
      if (images[key]) {
        data.append(key, images[key]);
      }
    });

    try {
      await axios.put(`${backendUrl}/api/product/edit/${id}`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem('token'),
        },
      });
      toast.success('Product updated successfully!');
      navigate('/list');
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Failed to update product');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="sizes"
          placeholder='Sizes (e.g. ["S","M","L"])'
          value={formData.sizes}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="subCategory"
          placeholder="Sub Category"
          value={formData.subCategory}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="bestseller"
          value={formData.bestseller}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        >
          <option value="false">Not Bestseller</option>
          <option value="true">Bestseller</option>
        </select>

        {/* Upload images */}
        {[1, 2, 3, 4].map((i) => (
          <div key={`image${i}`}>
            <label className="block font-medium mb-1">Image {i}</label>
            <input
              type="file"
              name={`image${i}`}
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
