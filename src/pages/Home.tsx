import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Star, TrendingUp } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const featuredSlides = [
  {
    id: 1,
    title: "Essential Student Bundles",
    description: "Complete room setup packages at exclusive student prices",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 2,
    title: "Electronics Collection",
    description: "Latest gadgets for your academic success",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    title: "Kitchen Essentials",
    description: "Everything you need for your dorm kitchen",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];

const topSellingProducts = [
  {
    id: 1,
    name: "Study Desk Pro",
    price: 199.99,
    rating: 4.8,
    sales: 150,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "LED Desk Lamp",
    price: 49.99,
    rating: 4.7,
    sales: 200,
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Ergonomic Chair",
    price: 299.99,
    rating: 4.9,
    sales: 120,
    image: "https://images.unsplash.com/photo-1505797149-35ebcb05a6fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Mini Fridge",
    price: 159.99,
    rating: 4.6,
    sales: 180,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <div className="relative">
        <Slider {...sliderSettings} className="overflow-hidden">
          {featuredSlides.map((slide) => (
            <div key={slide.id} className="relative h-[500px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-xl mb-8">{slide.description}</p>
                  <Link
                    to="/products"
                    className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Top Selling Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* <div className="flex items-center mb-8">
          <TrendingUp className="h-8 w-8 text-indigo-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">Top Selling Products</h2>
        </div> */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* {topSellingProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded text-sm">
                  {product.sales} sold
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-600">{product.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))} */}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;