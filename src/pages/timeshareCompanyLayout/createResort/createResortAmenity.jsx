import { PlusCircleIcon, TrashIcon, XCircleIcon, XIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const CreateResortAmenity = ({ onUpdateData, onNext, onBack, formData }) => {
  const [amenities, setAmenities] = useState([]);

  // Separate states for each section
  const [onSiteFeature, setOnSiteFeature] = useState('');
  const [nearbyAttraction, setNearbyAttraction] = useState('');
  const [policy, setPolicy] = useState('');

  // Handle adding amenity based on type
  const handleAddAmenity = (name, type) => {
    if (name) {
      setAmenities([...amenities, { name, type }]);

      // Clear the corresponding input field based on type
      if (type === '1') setOnSiteFeature('');
      else if (type === '2') setNearbyAttraction('');
      else if (type === '3') setPolicy('');
    }
  };

  // Handle removing an amenity by name
  const handleRemoveAmenity = (name) => {
    const updatedAmenities = amenities.filter((amenity) => amenity.name !== name);
    setAmenities(updatedAmenities);
  };

  useEffect(() => {
    onUpdateData({
      ...formData,
      resortAmenityList: amenities
    });
  }, [amenities])

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();



    if (onNext) {
      onNext();
    }
  };

  // Filter amenities by type for rendering
  const renderAmenitiesByType = (type) => {
    return amenities
      .filter((amenity) => amenity.type === type)
      .map((amenity) => (
        <div key={amenity.name} className="relative flex justify-center items-center rounded-full border mt-2 p-2">
          <span>{amenity.name}</span>

          <button
            type="button"
            onClick={() => handleRemoveAmenity(amenity.name)}
            className="absolute top-1 right-0 text-red-500 flex items-center"
          >
            <XCircleIcon className="h-7 w-7" />
          </button>
        </div>

      ));
  };



  return (
    <div className="p-6">
      <div className="border border-sky-400 rounded-md p-8 space-y-14">
        <h4 className="text-2xl font-bold mb-4">Tiện ích khách sạn</h4>

        {/* Section for Adding On-site Features */}
        <div className="mt-4">
          <h3 className="text-md font-semibold">Các tính năng và tiện nghi tại chỗ</h3>
          <div className="grid grid-cols-6 py-4 gap-4">
            {renderAmenitiesByType('1')}
            <div className='flex'>
              <input
                type="text"
               className="border p-2 rounded-full focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-300 transition duration-200"
                value={onSiteFeature}
                onChange={(e) => setOnSiteFeature(e.target.value)}
                placeholder="Thêm tính năng tại chỗ"
              />
              <button
                type="button"
                onClick={() => handleAddAmenity(onSiteFeature, '1')}
                className=" text-white p-2 rounded flex items-center space-x-2"
              >
                <PlusCircleIcon color='#6A9CFD' className="h-8 w-8" />
                <span>Thêm</span>
              </button>
            </div>
          </div>


        </div>

        <div className="mt-4">
          <h3 className="text-md font-semibold">Các điểm tham quan lân cận</h3>
          <div className="grid grid-cols-6 py-4 gap-4">
            {renderAmenitiesByType('2')}
            <div className='flex'>
              <input
                type="text"
               className="border p-2 rounded-full focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-300 transition duration-200"
                value={nearbyAttraction}
                onChange={(e) => setNearbyAttraction(e.target.value)}
                placeholder="Thêm điểm tham quan lân cận"
              />
              <button
                type="button"
                onClick={() => handleAddAmenity(nearbyAttraction, '2')}
                className=" text-white p-2 rounded flex items-center space-x-2"
              >
                <PlusCircleIcon color='#6A9CFD' className="h-8 w-8" />
                <span>Thêm</span>
              </button>
            </div>
          </div>


        </div>

        <div className="mt-4">
          <h3 className="text-md font-semibold">Các chính sách</h3>
          <div className="grid grid-cols-6 py-4 gap-4">
            {renderAmenitiesByType('3')}
            <div className='flex'>
              <input
                type="text"
                className="border p-2 rounded-full focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-300 transition duration-200"
                value={policy}
                onChange={(e) => setPolicy(e.target.value)}
                placeholder="Thêm chính sách"
              />
              <button
                type="button"
                onClick={() => handleAddAmenity(policy, '3')}
                className="text-white p-2 rounded flex items-center space-x-2"
              >
                <PlusCircleIcon color='#6A9CFD' className="h-8 w-8" />
                <span>Thêm</span>
              </button>
            </div>
          </div>


        </div>

      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="bg-indigo-400 hover:bg-indigo-700 text-indigo-100 rounded-full flex items-center"
        >
          <span class="bg-indigo-500 hover:bg-indigo-700 w-12 h-12 flex items-center justify-center rounded-full mr-4"><FaArrowLeft /></span><span class="mr-6">trở lại</span>
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-indigo-400 hover:bg-indigo-700 text-indigo-100 pl-6 rounded-full flex items-center"
        >
          <span class="mr-6">Bước tiếp theo</span><span class="bg-indigo-500 hover:bg-indigo-700 w-12 h-12 flex items-center justify-center rounded-full"><FaArrowRight /></span>
        </button>
      </div>
    </div>
  );
};

export default CreateResortAmenity;
