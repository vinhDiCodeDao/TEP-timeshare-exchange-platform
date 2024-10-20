import { PlusIcon, XIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UnitTypeModal from '../../../components/Modal/unitTypeModal';
import { setResortId } from '../../../redux/ResortSlice/Resort';
import { createResortUnitType } from '../../../service/tsCompanyService/tsCompanyAPI';
import { toast, Toaster } from 'react-hot-toast';
const CreateUnitType = ({ onUpdateData, onNext, onBack, formData }) => {
  const { resortId } = useSelector((state) => state.resortId);
  const [selectedUnitType, setSelectedUnitType] = useState(null);
  const [isOpenModalUnitType, setIsOpenModalUnitType] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [indexSelected, setIndexSelected] = useState(-1)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleAddUnitType = (newUnitType) => {
    setRoomTypes([...roomTypes, newUnitType]);
    setIsOpenModalUnitType(false)
  }

  const handleDeleteRoomType = (indexToDelete) => {
    setRoomTypes(roomTypes.filter((_, index) => index !== indexToDelete)); // Remove room type by index
  };
  const handleEditUnitType = (index) => {
    setSelectedUnitType({ ...roomTypes[index] }); // Lưu trữ item được chọn và vị trí trong mảng
    setIndexSelected(index);
    setIsOpenModalUnitType(true); // Mở modal
  };

  const handleSubmit = async () => {
    try {
      setLoading(true)
      for (const roomType of roomTypes) {


        // Gọi API tạo loại phòng
        const response = await createResortUnitType(roomType);

        // Kiểm tra nếu POST thất bại
        if (response.status === 200) {
          setLoading(false);
        }

      }

      // Nếu tất cả POST thành công, chuyển sang bước tiếp theo

      dispatch(setResortId(null))
      toast.success("Tạo mới thành công!", { duration: 1000 })
      setTimeout(() => {
        navigate('/timesharecompany/resortmanagementtsc');
      }, 1000);  // Delay of 1000 milliseconds = 1 second

    } catch (error) {
      console.error('Error creating unit types:', error);
      // Bạn có thể thêm thông báo lỗi hoặc thông báo cho người dùng ở đây
    }
  };

  const handleOpenModalAdd = () => {

    setSelectedUnitType(null)
    setIsOpenModalUnitType(true)
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className='border p-6 rounded-xl'>
        <h2 className="text-xl font-bold mb-4">Loại phòng</h2>
        <div className='grid grid-cols-4 gap-4 p-4 min-h-96'>
          {roomTypes.map((room, index) => (
            <div
              onClick={() => handleEditUnitType(index)}
              key={index}
              className="relative p-4 border-2 h-40 shadow-sm hover:shadow-md rounded-lg text-center flex justify-center items-center"
            >
              <span>{room.title}</span> {/* Display the title of the room */}

              {/* Delete Button (X icon) */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn chặn việc mở modal khi click nút delete
                  handleDeleteRoomType(index);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          ))}


          {/* Add Room Type Button */}
          <button
            className="flex items-center h-40 gap-2 justify-center p-4 border-2 border-dashed text-black rounded-lg"
            onClick={handleOpenModalAdd} // Open modal on click
          >
            <label>Thêm</label>
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>

      </div>
      <UnitTypeModal
        isOpen={isOpenModalUnitType}
        onClose={() => setIsOpenModalUnitType(false)} // Close modal
        onAddRoomType={handleAddUnitType}
        selectedUnitType={selectedUnitType}
        onUpdateRoomType={(updatedUnitType) => {
          // Cập nhật item trong danh sách
          const updatedRoomTypes = [...roomTypes];
          updatedRoomTypes[indexSelected] = updatedUnitType;
          setRoomTypes(updatedRoomTypes);
          setIsOpenModalUnitType(false); // Đóng modal sau khi cập nhật
        }}
      />
      <div className="mt-6 flex justify-between">
        <button type="button" onClick={onBack} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Quay lại
        </button>
        <button type="button" onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default CreateUnitType;
