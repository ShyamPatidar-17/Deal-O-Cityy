import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {token
          }
        }
      );
if(response.data.success)
{


      toast.success("Product added successfully!");
      setName('');
      setDescription('');
      setPrice('');
      setCategory('Men');
      setSubCategory('Topwear');
      setBestseller(false);
      setSizes([]);
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);
}
else{
    toast.error(response.data.message)
}
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form className='flex flex-col w-full items-start gap-3' onSubmit={handleSubmit}>
      {/* Image Upload */}
      <div>
        <p className='mb-2'>Upload Images</p>
        <div className='flex gap-2'>
          {[image1, image2, image3, image4].map((img, idx) => (
            <label key={idx} htmlFor={`image${idx + 1}`} className='m-5'>
              <img
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt="Upload"
                className='w-20 h-20 object-cover rounded'
              />
              <input
                type="file"
                id={`image${idx + 1}`}
                hidden
                onChange={(e) => {
                  const setter = [setImage1, setImage2, setImage3, setImage4][idx];
                  setter(e.target.files[0]);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder='Enter Product Name'
          className='w-full max-w-[500px] px-3 py-2 border rounded'
        />
      </div>

      {/* Description */}
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder='Enter product description'
          className='w-full max-w-[500px] px-3 py-2 border rounded'
        />
      </div>

      {/* Category, Subcategory, Price */}
      <div className='flex flex-col sm:flex-row gap-4 w-full'>
        <div>
          <p className='mb-2'>Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full px-3 py-2 border rounded'
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub-Category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className='w-full px-3 py-2 border rounded'
          >
            <option value="Topwear">Top-Wear</option>
            <option value="Bottomwear">Bottom-Wear</option>
            <option value="Winterwear">Winter-Wear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Price</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Enter Price'
            className='w-full px-3 py-2 border rounded sm:w-[120px]'
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className='mb-2'>Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <p
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 cursor-pointer border rounded ${
                sizes.includes(size) ? 'bg-green-600 text-white' : 'bg-slate-200'
              }`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className='flex gap-2 mt-2'>
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label htmlFor="bestseller" className='cursor-pointer'>
          Add to Bestseller
        </label>
      </div>

      {/* Submit */}
      <button
        type='submit'
        className='w-32 py-3 mt-4 bg-black text-white hover:bg-green-700 rounded-full'
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
