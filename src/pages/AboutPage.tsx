import React from 'react';
import { ChefHat, Heart, Users, Globe } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Guided Cooking</h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="text-gray-600 mb-8 text-center text-lg">
            We're passionate about making cooking accessible, enjoyable, and educational for everyone.
            Our step-by-step guidance and voice instructions help you create amazing dishes with confidence.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ChefHat className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-600">
                Each recipe is carefully curated and broken down into clear, manageable steps with voice instructions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Globe className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Cuisine</h3>
              <p className="text-gray-600">
                Explore dishes from around the world, from traditional recipes to modern fusion cuisine.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-8">
            We believe that cooking should be an enjoyable experience for everyone, regardless of their skill level. 
            Our platform combines traditional recipes with modern technology to create an interactive cooking experience 
            that helps you learn and improve your culinary skills.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-blue-600" />
                <span>Passionate about cooking and teaching</span>
              </li>
              <li className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Growing community of food enthusiasts</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <span>Diverse collection of recipes from around the world</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}