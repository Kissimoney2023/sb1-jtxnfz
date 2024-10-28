import React from 'react';
import { Users, Heart, MessageCircle } from 'lucide-react';

export function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Community</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Community Posts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100"
              alt="User avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium">Sarah Johnson</h3>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          
          <img
            src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
            alt="Recipe"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          
          <p className="text-gray-600 mb-4">
            Just made this amazing homemade pasta! The recipe from this app was super easy to follow. 🍝
          </p>
          
          <div className="flex items-center gap-6 text-gray-500">
            <button className="flex items-center gap-2 hover:text-red-500">
              <Heart className="w-5 h-5" />
              <span>24</span>
            </button>
            <button className="flex items-center gap-2 hover:text-blue-500">
              <MessageCircle className="w-5 h-5" />
              <span>12</span>
            </button>
          </div>
        </div>

        {/* More community posts... */}
      </div>
    </div>
  );
}