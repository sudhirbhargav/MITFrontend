import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const statusIcons = {
  pending: <Clock className="h-5 w-5 text-yellow-500" />,
  completed: <CheckCircle className="h-5 w-5 text-green-500" />,
  placed: <CheckCircle className="h-5 w-5 text-blue-500" />,
  cancelled: <XCircle className="h-5 w-5 text-red-500" />,
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  placed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
};

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        let token=localStorage.getItem("authToken");
        const response = await axios.get('https://mitbackend-5s9a.onrender.com/api/orderhistory', {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with actual token
          },
        });
        console.log(response)
        setOrders(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Package className="h-8 w-8 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        </div>

        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="border-b p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order #{order._id}</p>
                    <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${statusColors[order.status as keyof typeof statusColors]}`}
                    >
                      {statusIcons[order.status as keyof typeof statusIcons]}
                      <span className="capitalize">{order.status}</span>
                    </div>
                    <p className="text-lg font-bold text-indigo-600">${order.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-6">
                  {order.products.map((product: any) => (
                    <div key={product.productId._id} className="flex items-center">
                      <img
                        src="https://via.placeholder.com/100" // Placeholder for missing images
                        alt={product.productId.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="ml-6 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{product.productId.name}</h3>
                        <p className="text-gray-600">Quantity: {product.quantity}</p>
                        <p className="text-indigo-600 font-medium">${product.productId.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Delivery Address</h4>
                  <p className="text-gray-600">
                    123 Main St<br />
                    Cambridge, MA 02142
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
