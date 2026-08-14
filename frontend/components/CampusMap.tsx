"use client";
import React, { useState } from 'react';

const locations = [
  { id: 'main', name: 'Main Building', query: 'IIT+Kharagpur+Main+Building' },
  { id: 'library', name: 'Central Library', query: 'Central+Library,+IIT+Kharagpur' },
  { id: 'gymkhana', name: 'TSG (Gymkhana)', query: 'Technology+Students+Gymkhana,+IIT+Kharagpur' },
  { id: 'hospital', name: 'BC Roy Tech Hospital', query: 'B+C+Roy+Technology+Hospital,+IIT+Kharagpur' },
  { id: 'tech_market', name: 'Tech Market', query: 'Tech+Market,+IIT+Kharagpur' },
  { id: 'tata_steel', name: 'Tata Steel Complex (Stadium)', query: 'Tata+Sports+Complex,+IIT+Kharagpur' },
  { id: 'takshashila', name: 'Takshashila', query: 'Takshashila,+IIT+Kharagpur' },
  { id: 'jc_bose', name: 'JC Bose Complex', query: 'J.+C.+Bose+Laboratory+Complex,+IIT+Kharagpur' },
];

export default function CampusMap() {
  const [activeLocation, setActiveLocation] = useState(locations[0]);

  return (
    <div className="mb-6 md:mb-8 rounded-lg shadow-sm border border-gray-200 bg-white overflow-hidden">
      <div className="hidden md:block bg-[#FF7F00] text-white px-4 py-3">
        <h3 className="font-lexend font-semibold text-lg m-0">Campus Map</h3>
      </div>
      
      {/* Mobile specific header */}
      <div className="md:hidden px-4 py-3 border-b border-gray-100">
        <h3 className="font-lexend font-bold text-lg text-gray-800 m-0 uppercase">CAMPUS MAP</h3>
      </div>

      <div className="p-4 bg-[#fafafa] flex flex-col gap-4">
        {/* Mobile Dropdown */}
        <div className="md:hidden w-full relative">
          <select 
            className="w-full appearance-none bg-gradient-to-r from-orange-50 to-white border border-orange-200 text-orange-900 font-inter font-semibold py-3 px-4 rounded-xl shadow-sm focus:outline-none focus:border-[#FF7F00] focus:ring-1 focus:ring-[#FF7F00] transition-all"
            value={activeLocation.id}
            onChange={(e) => {
              const loc = locations.find(l => l.id === e.target.value);
              if (loc) setActiveLocation(loc);
            }}
          >
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#FF7F00]">
            <i className="fas fa-chevron-down text-sm"></i>
          </div>
        </div>

        {/* Map Container */}
        <div className="w-full h-80 md:h-[450px] rounded-xl overflow-hidden border border-gray-200 shadow-inner relative">
          {/* Note: In a production environment with a Maps API key, you could use the Maps JavaScript API 
              to display multiple custom markers at once. For this iframe approach without an API key, 
              we dynamically change the focused location. */}
          <iframe 
            src={`https://maps.google.com/maps?q=${activeLocation.query}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="IIT Kharagpur Campus Map"
          ></iframe>
        </div>

        {/* Desktop Buttons — equal-width grid, no ragged ends */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-2">
          {locations.map(loc => (
            <button
              key={loc.id}
              onClick={() => setActiveLocation(loc)}
              className={`
                flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-inter text-sm font-semibold transition-all duration-200 border text-center
                ${activeLocation.id === loc.id
                  ? 'bg-gradient-to-r from-[#FF7F00] to-[#ff9e3d] text-white border-transparent shadow-md ring-2 ring-[#FF7F00]/30'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-[#FF7F00] hover:bg-orange-50 hover:shadow-sm'}
              `}
            >
              <i className={`fas fa-location-dot text-sm shrink-0 ${activeLocation.id === loc.id ? 'text-white' : 'text-[#FF7F00]'}`}></i>
              <span className="truncate">{loc.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
