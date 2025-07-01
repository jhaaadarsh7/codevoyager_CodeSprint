import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { financialUtils, dateUtils } from "../contexts/UserContextUtils";
import { 
  ArrowLeft,
  Search,
  MapPin,
  Star,
  Calendar,
  Users,
  Filter,
  Heart,
  Wifi,
  Car,
  Coffee,
  Waves, // Using Waves instead of Swimming
  Dumbbell,
  Utensils,
  ChevronRight,
  Clock,
  Phone,
  Mail,
  Globe,
  Hotel
} from "lucide-react";

export default function HotelBooking() {
  const { user, getFullName } = useUser();
  const navigate = useNavigate();
  
  // Current date and time - July 1, 2025 09:38:00 UTC
  const [currentTime] = useState('9:41');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteHotels, setFavoriteHotels] = useState(new Set());
  const [currentDate] = useState('2025-07-01');

  // Popular hotels data with updated context for July 1, 2025
  const popularHotels = [
    {
      id: 1,
      name: "Bagaicha Resort",
      location: "Dharan-5, Sunsari",
      price: 2500,
      originalPrice: 3200,
      rating: 4.7,
      reviews: 245,
      image: "/api/placeholder/300/200",
      amenities: ["wifi", "parking", "restaurant", "pool"],
      category: "resort",
      discount: 22,
      description: "Luxury resort with mountain views and traditional Nepali hospitality",
      availability: "3 rooms left",
      specialOffer: "Free breakfast for tourists"
    },
    {
      id: 2,
      name: "VIRABHADA RESORT",
      location: "Hetauda",
      price: 2500,
      originalPrice: 3000,
      rating: 4.8,
      reviews: 189,
      image: "/api/placeholder/300/200",
      amenities: ["wifi", "pool", "gym", "restaurant"],
      category: "resort",
      discount: 17,
      description: "Modern resort with excellent facilities and scenic surroundings",
      availability: "5 rooms left",
      specialOffer: "Pool access included"
    },
    {
      id: 3,
      name: "Hotel Riverside",
      location: "Kathmandu Valley",
      price: 3500,
      originalPrice: 4200,
      rating: 4.9,
      reviews: 356,
      image: "/api/placeholder/300/200",
      amenities: ["wifi", "restaurant", "gym", "spa"],
      category: "hotel",
      discount: 17,
      description: "Premium hotel in the heart of Kathmandu with river views",
      availability: "Available",
      specialOffer: "Airport pickup included"
    }
  ];

  // Hot packages data with July 2025 context
  const hotPackages = [
    {
      id: 1,
      name: "Sukun Hotel",
      location: "Pokhara Lakeside",
      price: 1500,
      originalPrice: 2000,
      rating: 4.8,
      reviews: 142,
      image: "/api/placeholder/300/200",
      discount: 25,
      packageType: "2N/3D Package",
      includes: ["Breakfast", "Airport Transfer", "Boat Ride"],
      validUntil: "2025-07-15",
      availability: "Limited time offer"
    },
    {
      id: 2,
      name: "Suprazz Resort",
      location: "Chitwan National Park",
      price: 1000,
      originalPrice: 1500,
      rating: 4.6,
      reviews: 98,
      image: "/api/placeholder/300/200",
      discount: 33,
      packageType: "Jungle Safari Package",
      includes: ["All Meals", "Safari Tours", "Cultural Shows"],
      validUntil: "2025-07-20",
      availability: "Monsoon special"
    }
  ];

  // Updated destinations for Nepal tourism
  const popularDestinations = [
    "Kathmandu", "Pokhara", "Chitwan", "Lumbini", "Bhaktapur", 
    "Bandipur", "Nagarkot", "Dharan", "Hetauda", "Janakpur",
    "Gorkha", "Mustang", "Annapurna", "Everest Base Camp"
  ];

  const amenityIcons = {
    wifi: <Wifi className="w-4 h-4" />,
    parking: <Car className="w-4 h-4" />,
    restaurant: <Utensils className="w-4 h-4" />,
    pool: <Waves className="w-4 h-4" />, // Using Waves for pool
    gym: <Dumbbell className="w-4 h-4" />,
    coffee: <Coffee className="w-4 h-4" />,
    spa: <Star className="w-4 h-4" />
  };

  const toggleFavorite = (hotelId) => {
    const newFavorites = new Set(favoriteHotels);
    if (newFavorites.has(hotelId)) {
      newFavorites.delete(hotelId);
    } else {
      newFavorites.add(hotelId);
    }
    setFavoriteHotels(newFavorites);
  };

  const handleBookNow = (hotel, isPackage = false) => {
    const bookingDetails = {
      hotel: hotel.name,
      location: hotel.location,
      price: hotel.price,
      date: currentDate,
      user: getFullName() || 'aadityabinod',
      type: isPackage ? 'package' : 'room',
      checkIn: '2025-07-01',
      checkOut: '2025-07-03'
    };
    
    alert(`🏨 Hotel Booking Confirmation

📅 Current Date: July 1, 2025, 09:38:00 UTC
👤 Guest: ${bookingDetails.user}

🏨 Hotel Details:
${bookingDetails.hotel}
📍 ${bookingDetails.location}
💰 NPR ${financialUtils.formatNumber(bookingDetails.price)}/night
📅 Check-in: ${dateUtils.formatDate(bookingDetails.checkIn, 'readable')}
📅 Check-out: ${dateUtils.formatDate(bookingDetails.checkOut, 'readable')}
🎯 Booking Type: ${bookingDetails.type}

💳 Total Amount: NPR ${financialUtils.formatNumber(bookingDetails.price * 2)}
🎁 Tourist Discount: 15% applied
🚗 Free airport pickup included

Redirecting to secure payment gateway...`);
  };

  const handleSearch = (destination) => {
    setSelectedDestination(destination);
    setSearchQuery(destination);
    alert(`🔍 Hotel Search Results - ${destination}

📅 Date: July 1, 2025
👤 Searched by: aadityabinod
📍 Destination: ${destination}

🏨 Found Results:
• 45+ hotels available
• 12 resorts with monsoon packages
• 8 boutique properties
• Tourist special rates applied

🎯 Filters Available:
• Price: NPR 800 - NPR 15,000/night
• Rating: 3.5+ stars
• Amenities: WiFi, Pool, Restaurant
• Distance: City center, Airport proximity

Ready to book!`);
  };

  const HotelCard = ({ hotel, isPackage = false }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4 border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="relative">
        {/* Hotel Image Placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0V0zm10 10h20v20H10V10z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="text-center text-white relative z-10">
            <div className="text-4xl mb-2">🏨</div>
            <p className="text-sm font-medium">{hotel.name}</p>
            <p className="text-xs opacity-75">{hotel.location}</p>
            {hotel.availability && (
              <p className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full mt-2 inline-block">
                {hotel.availability}
              </p>
            )}
          </div>
        </div>
        
        {/* Discount badge */}
        {hotel.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
            {hotel.discount}% OFF
          </div>
        )}
        
        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(hotel.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart 
            className={`w-4 h-4 ${favoriteHotels.has(hotel.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
          />
        </button>
        
        {/* Package type for hot packages */}
        {isPackage && hotel.packageType && (
          <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {hotel.packageType}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-lg">{hotel.name}</h3>
            <div className="flex items-center text-gray-600 text-sm mb-1">
              <MapPin className="w-3 h-3 mr-1" />
              {hotel.location}
            </div>
            
            {/* Rating */}
            <div className="flex items-center mb-2">
              <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                <span className="text-xs font-medium text-green-800">{hotel.rating}</span>
              </div>
              <span className="text-xs text-gray-500 ml-2">({hotel.reviews} reviews)</span>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-xs text-gray-600 mb-3">{hotel.description}</p>
        
        {/* Special offer */}
        {hotel.specialOffer && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
            <p className="text-xs text-yellow-800 font-medium">🎁 {hotel.specialOffer}</p>
          </div>
        )}
        
        {/* Amenities */}
        {hotel.amenities && (
          <div className="flex flex-wrap gap-2 mb-3">
            {hotel.amenities.slice(0, 4).map((amenity) => (
              <div key={amenity} className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                {amenityIcons[amenity]}
                <span className="text-xs ml-1 capitalize">{amenity}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Package includes for hot packages */}
        {isPackage && hotel.includes && (
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-700 mb-1">Package Includes:</p>
            <div className="flex flex-wrap gap-1">
              {hotel.includes.map((item, index) => (
                <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Price and booking */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              {hotel.originalPrice && (
                <span className="text-xs text-gray-400 line-through mr-2">
                  NPR {financialUtils.formatNumber(hotel.originalPrice)}
                </span>
              )}
              <span className="text-lg font-bold text-gray-800">
                NPR {financialUtils.formatNumber(hotel.price)}
              </span>
            </div>
            <p className="text-xs text-gray-600">/night {isPackage ? '(package)' : ''}</p>
            {isPackage && hotel.validUntil && (
              <p className="text-xs text-red-600">Valid until {dateUtils.formatDate(hotel.validUntil, 'short')}</p>
            )}
          </div>
          
          <button
            onClick={() => handleBookNow(hotel, isPackage)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors flex items-center shadow-md hover:shadow-lg"
          >
            Book Now
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col">
        {/* Status Bar */}
        <div className="bg-blue-600 px-4 py-2 flex justify-between items-center text-white text-sm">
          <div className="bg-blue-500 px-2 py-1 rounded font-bold">
            {currentTime}
          </div>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white rounded-full"></div>
            </div>
            <Wifi className="w-4 h-4" />
            <div className="w-6 h-3 bg-white rounded-sm"></div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 mr-3 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Hotel</h1>
              <p className="text-sm text-gray-600">Find your hotel</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination"
              className="w-full pl-10 pr-4 py-3 bg-green-500 text-white placeholder-white rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          
          {/* Popular destinations dropdown */}
          {searchQuery && (
            <div className="mt-2 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto z-10 relative">
              {popularDestinations
                .filter(dest => dest.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((destination) => (
                  <button
                    key={destination}
                    onClick={() => handleSearch(destination)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center transition-colors"
                  >
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {destination}
                  </button>
                ))
              }
            </div>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="px-4 pb-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="font-medium text-gray-800 mb-3">Filters</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Price Range</button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">Rating 4+</button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">Free WiFi</button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">Pool</button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">Tourist Friendly</button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          {/* Popular Hotels Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Popular hotels</h2>
            <div className="space-y-4">
              {popularHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>

          {/* Hot Packages Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Hot Packages</h2>
              <button className="text-blue-600 text-sm font-medium hover:underline">View all</button>
            </div>
            
            {/* Discount banner */}
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block animate-pulse">
              10% OFF
            </div>
            
            <div className="space-y-4">
              {hotPackages.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} isPackage={true} />
              ))}
            </div>
          </div>

          {/* Monsoon Special Offers - July 2025 Context */}
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-4 mb-6 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2 flex items-center">
              🌧️ Monsoon Season Special - July 2025
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 20% off on mountain resorts during monsoon</li>
              <li>• Free indoor activities and cultural programs</li>
              <li>• Complimentary hot tea and local snacks</li>
              <li>• Extended checkout until 2 PM</li>
              <li>• Special rates for extended stays (5+ nights)</li>
            </ul>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-blue-600">Valid: July 1-31, 2025 • Monsoon season rates</span>
              <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full font-medium hover:bg-blue-600 transition-colors">
                Book Now
              </button>
            </div>
          </div>

          {/* Tourist Information */}
          <div className="bg-orange-50 rounded-2xl p-4 mb-6 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-3 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Tourist Information - July 2025
            </h3>
            <div className="space-y-2 text-sm text-orange-700">
              <p><strong>Weather:</strong> Monsoon season, 20-28°C, occasional rain</p>
              <p><strong>Best for:</strong> Cultural tours, indoor activities, spa treatments</p>
              <p><strong>Currency:</strong> NPR (Nepalese Rupee) - USD rate: 134.7</p>
              <p><strong>Tourist SIM:</strong> Available at airport, NPR 500 for 30 days</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 rounded-2xl p-4 mb-6">
            <h3 className="font-bold text-blue-800 mb-3 flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              24/7 Tourist Support
            </h3>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex items-center">
                <Phone className="w-3 h-3 mr-2" />
                <span>Emergency: +977-1-4200-200</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-3 h-3 mr-2" />
                <span>hotels@nepal-tourism.gov.np</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-2" />
                <span>Current time: July 1, 2025, 09:38 UTC</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-3 h-3 mr-2" />
                <span>Tourist helpdesk available in 12 languages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="p-4 bg-white border-t shadow-lg">
          <button
            onClick={() => alert(`🏨 Nepal Hotel Booking Platform - July 1, 2025

Current Status:
📅 Date: July 1, 2025, 09:38:00 UTC
👤 User: aadityabinod (Logged in)
🌧️ Season: Monsoon (Special rates active)
🏨 Available Properties: 150+ verified hotels
💰 Tourist Exchange Rate: USD 1 = NPR 134.7

📍 Popular Destinations:
• Kathmandu Valley - Cultural heritage
• Pokhara Lakeside - Mountain views
• Chitwan National Park - Wildlife safari
• Lumbini - Buddha's birthplace

🎁 Active Promotions:
• 20% monsoon season discount
• Free airport pickup for 3+ nights
• Complimentary cultural programs
• Extended checkout privileges

Ready to book your perfect Nepal experience!`)}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
}