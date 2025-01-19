import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the route
  const { setCartItems } = useAuth();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    // Fetch all product data and filter by ID
    const fetchProduct = async () => {
      try {
        // const response = await axios.get('https://mitbackend-5s9a.onrender.com/api/getproduct');
        let token=localStorage.getItem("authToken");
        const response = await axios.get('https://mitbackend-5s9a.onrender.com/api/getproduct', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const allProducts = response.data;

        // Filter the product by ID
        const filteredProduct = allProducts.find((product) => product._id === id);

        if (filteredProduct) {
          setProduct(filteredProduct);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const newCartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity.toString(),
      image: product.images[0],
    };

    setCartItems((prevCartItems) => {
      const items = prevCartItems ?? [];
      const existingItemIndex = items.findIndex((item) => item.id === newCartItem.id);

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...items];
        updatedCartItems[existingItemIndex].quantity =
          Number(updatedCartItems[existingItemIndex].quantity) + quantity;
        return updatedCartItems;
      }

      return [...items, newCartItem];
    });

    console.log(`Adding ${quantity} ${product.name}(s) to cart`);
    setQuantity(1);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log('Submitting review:', { rating: newRating, comment: newComment });
    setNewComment('');
    setNewRating(5);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-24 h-24 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-indigo-600' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.reviews[0]?.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews.length} reviews)</span>
              </div>
              <p className="text-3xl font-bold text-indigo-600">${product.price}</p>
              <p className="text-gray-600">{product.description}</p>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="h-5 w-5 text-gray-600" />
                  </button>
                  <span className="px-4 py-2 text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review._id} className="border-b pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{review.comment}</span>
                      <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
