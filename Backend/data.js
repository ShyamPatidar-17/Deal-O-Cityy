import { MongoClient, ObjectId } from 'mongodb';

// 1. Replace with your actual MongoDB Atlas connection string
const MONGODB_URI =
"mongodb+srv://shyampatidar672_db_user:aHNIKs5Xhz7qjY2Q@deal-o-city.itoaq7j.mongodb.net/?appName=Deal-o-City";
const DATABASE_NAME = "Deal-o-City";
const COLLECTION_NAME = "products";

// 2. Your exact dataset mapping raw strings into real ObjectIds
const productsData = [
  {
    _id: new ObjectId('686c955f761d92e50e9c6470'),
    name: "Men's Off-Shoulder Style T-Shirt",
    description: "Men's Off-Shoulder Style T-Shirt",
    price: 249,
    image: [
      'https://res.cloudinary.com/dk2epwumu/image/upload/v1751946591/ykdqqlgrv49rhiagebhu.png'
    ],
    category: 'Men',
    subCategory: 'Topwear',
    sizes: [ 'M', 'S', 'L', 'XL' ],
    bestseller: false,
    date: 1751946591882,
    __v: 0
  },
  {
    _id: new ObjectId('686c9672761d92e50e9c6478'),
    name: 'Men Round Neck Pure Cotton T-shirt',
    description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.',
    price: 5000,
    image: [
      'https://res.cloudinary.com/dk2epwumu/image/upload/v1752223454/krbrh9o9d6fe6hzgeqio.png',
      'https://res.cloudinary.com/dk2epwumu/image/upload/v1752223454/nm6vnaprxogpxn5zqhj5.png',
      'https://res.cloudinary.com/dk2epwumu/image/upload/v1752223454/t2fl2lduu1vkydwjm4ox.png',
      'https://res.cloudinary.com/dk2epwumu/image/upload/v1752223454/xgo0ib6yjc1bwml1niqs.png'
    ],
    category: 'Men',
    subCategory: 'Topwear',
    sizes: [ 'M', 'S', 'L', 'XL' ],
    bestseller: true,
    date: 1751946866607,
    __v: 0
  },
  {
    _id: new ObjectId('686c9420761d92e50e9c6467'),
    name: 'Cotton  Frock for Girls',
    description: 'Adorable cotton frock for girls, soft and breathable, perfect for casual wear, playdates, or summer outings.',
    price: 999,
    image: [
      'https://res.cloudinary.com/dk2epwumu/image/upload/v1751946272/jh0xfgpac3mbxpi52feu.png'
    ],
    category: 'Women',
    subCategory: 'Topwear',
    sizes: [ 'M', 'L', 'XL' ],
    bestseller: true,
    date: 1751946272869,
    __v: 0
  },
  {
    _id: new ObjectId('686c939f761d92e50e9c6465'),
    name: 'Women Cotton Top',
    description: '"A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment."',
    price: 599,
    image: [
      'https://res.cloudinary.com/dk2epwumu/image/upload/v1751946142/lu7efuud493liieucejn.png'
    ],
    category: 'Women',
    subCategory: 'Topwear',
    sizes: [ 'M', 'XL', 'L' ],
    bestseller: false,
    date: 1751946143006,
    __v: 0
  },
  {
    _id: new ObjectId('686c9516761d92e50e9c646e'),
    name: "Men's Nightwear Cotton Lower",
    description: 'Comfortable and breathable nightwear lower for men, made from soft cotton, ideal for relaxing and sleeping.',
    price: 549,
    image: [
      'https://res.cloudinary.com/dk2epwumu/image/upload/v1751946518/ctf0z8nrfxzmda2jdkjd.png'
    ],
    category: 'Men',
    subCategory: 'Bottomwear',
    sizes: [ 'L', 'M', 'S' ],
    bestseller: false,
    date: 1751946518931,
    __v: 0
  },
  {
    _id: new ObjectId('686c92bb761d92e50e9c645d'),
    name: 'Men Round Neck',
    description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.',
    price: 5000,
    image: [
      'https://res.cloudinary.com/dk2epwumu/image/upload/v1751945915/lk6fxngh04mdgekaiflu.png'
    ],
    category: 'Men',
    subCategory: 'Topwear',
    sizes: [ 'S', 'M', 'L', 'XL' ],
    bestseller: true,
    date: 1751945915719,
    __v: 0
  },
  {
    _id: new ObjectId('686c94c1761d92e50e9c646c'),
    name: "Men's Full Sleeve Cotton T-Shirt",
    description: 'Comfortable full sleeve t-shirt for men, made from soft cotton, ideal for casual wear or layering in all seasons.',
    price: 599,
    image: [
      'https://res.cloudinary.com/dk2epwumu/image/upload/v1751946432/nvcrdcumfnzelycvxok3.png'
    ],
    category: 'Men',
    subCategory: 'Topwear',
    sizes: [ 'M', 'L', 'S', 'XL' ],
    bestseller: false,
    date: 1751946433355,
    __v: 0
  },
  {
    _id: new ObjectId('686c946e761d92e50e9c646a'),
    name: 'Men Tapered Fit Flat-Front Trousers',
    description: "Stylish men's jeans made from durable denim, offering comfort, a perfect fit, and versatile everyday style.",
    price: 1299,
    image: [
      'https://res.cloudinary.com/dk2epwumu/image/upload/v1751946349/ly7akcehsee2ndpzqsnm.png'
    ],
    category: 'Men',
    subCategory: 'Bottomwear',
    sizes: [ 'XXL', 'L', 'M' ],
    bestseller: true,
    date: 1751946350505,
    __v: 0
  },
  {
    _id: new ObjectId('686c934a761d92e50e9c6462'),
    name: 'Girls Round Neck Cotton Top',
    description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.',
    price: 249,
    image: [
      'https://res.cloudinary.com/dk2epwumu/image/upload/v1751946057/tqyjnrpsqwojvla8szmq.png'
    ],
    category: 'Women',
    subCategory: 'Topwear',
    sizes: [ 'M', 'S' ],
    bestseller: true,
    date: 1751946058025,
    __v: 0
  },
  {
    _id: new ObjectId('686c9587761d92e50e9c6472'),
    name: "Classic White Men's T-Shirt",
    description: 'Timeless white t-shirt for men, made from premium cotton for ultimate comfort, breathability, and everyday style.',
    price: 149,
    image: [
      'https://res.cloudinary.com/dk2epwumu/image/upload/v1751946630/chj2u77ypwwtosrbtqw3.png'
    ],
    category: 'Men',
    subCategory: 'Topwear',
    sizes: [ 'L', 'M', 'S' ],
    bestseller: false,
    date: 1751946631263,
    __v: 0
  },
  {
    _id: new ObjectId('686c9602761d92e50e9c6476'),
    name: 'Stylish Blue Jacket for Boys',
    description: 'Trendy blue jacket for boys, made from warm, comfortable fabric—perfect for everyday wear and chilly days.',
    price: 556,
    image: [
      'https://res.cloudinary.com/dk2epwumu/image/upload/v1751946754/y2bglsb76gjdi9yhbuus.png'
    ],
    category: 'Kids',
    subCategory: 'Topwear',
    sizes: [ 'L', 'M', 'S', 'XL' ],
    bestseller: true,
    date: 1751946754617,
    __v: 0
  }
];

// 3. Execution function
async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    console.log(`Inserting ${productsData.length} items with original ObjectIds...`);
    
    // Using insertMany updates/inserts keeping specified _id values
    const result = await collection.insertMany(productsData);
    
    console.log(`🎉 Success! ${result.insertedCount} documents successfully inserted.`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await client.close();
    console.log("Connection closed cleanly.");
  }
}

seedDatabase();