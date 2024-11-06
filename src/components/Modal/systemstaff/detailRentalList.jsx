import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaEdit, FaMap, FaMapMarkerAlt } from "react-icons/fa";
import { FaPencil, FaXmark } from "react-icons/fa6";
import { acceptNewPriceValuation } from "../../../service/systemStaffService/systemStaffAPI";
import SpinnerWaiting from "../../LoadingComponent/spinnerWaiting";
const DetailRentalList = ({ isOpen, onClose, postingId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [newPriceValuation, setNewPriceValuation] = useState("");
  const [editFlag, setEditFlag] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const modalStyles = isOpen
    ? {}
    : {
        opacity: 0,
        transform: "translateX(100%)",
        transition: "all 0.3s ease",
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await acceptNewPriceValuation(
      postingId.rentalPostingId,
      parseFloat(newPriceValuation)
    );
    if (data) {
      console.log(data);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end p-3 h-full">
      <Toaster position="top-right" reverseOrder={false} />

      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl h-full flex flex-col"
        style={{ zIndex: 1000, ...modalStyles }}
      >
        {/* Header Section */}
        <div className="p-6 border-b flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <h1 className="text-xl font-bold tracking-wider">
            Thông tin chi tiết
          </h1>
          <div className="flex items-center">
            <div className="bg-white border border-gray-300 rounded-xl p-2 mr-2 hover:bg-gray-100 cursor-pointer shadow-sm">
              <button className="text-gray-500 focus:outline-none flex items-center">
                <FaEdit size={20} className="mr-2 text-blue-600" />
                <span>Chỉnh sửa</span>
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition duration-200"
            >
              <FaXmark size={28} />
            </button>
          </div>
        </div>

        {postingId ? (
          <>
            <div className="border-b">
              <div className="flex items-center p-4 m-3 border border-red-400 shadow-sm transition duration-200 relative">
                <img
                  src="https://cdn5.redweek.com/photos/full-preview/3/0/3/303804.jpg?1"
                  alt="Hotel Thumbnail"
                  className="w-20 h-20 rounded-lg mr-4 object-cover"
                />
                <div className="flex justify-between items-center w-full gap-4">
                  <div className="w-2/3">
                    <h2 className="text-xl text-gray-700 font-semibold mb-1">
                      {postingId.resortName}
                    </h2>
                    <div className="flex items-center text-blue-500">
                      <FaMap className="mr-2" />
                      <p>{postingId.address}</p>
                    </div>
                  </div>
                  <div>
                    <span className="bg-red-100 px-6 py-1 font-semibold text-red-500 rounded-full whitespace-nowrap absolute top-2 right-2">
                      Yêu cầu hỗ trợ
                    </span>
                  </div>
                </div>

                {/* Nhãn Đang chờ ở góc dưới bên phải với dấu chấm tròn */}
                <span className="absolute bottom-2 right-2 flex items-center bg-orange-50 px-3 py-1 font-semibold text-orange-300 rounded-full whitespace-nowrap">
                  <span className="inline-block w-2 h-2 mr-1 bg-orange-300 rounded-full"></span>
                  Đang chờ
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-700">
                Thông tin
              </h2>
              <div className="grid grid-cols-4 gap-4 mb-6 p-2">
                <p className="text-medium text-gray-500 mr-4">Mã đăng bài: </p>
                <p className="font-medium">{postingId.rentalPostingId}</p>

                <p className="text-medium text-gray-500 mr-4">Đăng bởi: </p>

                <p className="font-medium">{postingId.ownerName}</p>

                <p className="text-medium text-gray-500 mr-4">
                  Ngày nhận phòng:{" "}
                </p>
                <p className="font-medium">{postingId.checkinDate}</p>

                <p className="text-medium text-gray-500 mr-4">
                  Ngày trả phòng:{" "}
                </p>
                <p className="font-medium">{postingId.checkoutDate}</p>

                <p className="text-medium text-gray-500 mr-4">Giá phòng: </p>
                <p className="font-medium flex gap-4 items-center flex-col">
                  {postingId.totalPrice} VND{" "}
                </p>
                <p>
                  {editFlag ? (
                    <input
                      className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                      onChange={(e) => setNewPriceValuation(e.target.value)}
                      type="text"
                      name="newPriceValuation"
                      value={newPriceValuation}
                      placeholder="Nhập giá"
                    />
                  ) : (
                    <FaEdit
                      onClick={() => setEditFlag(true)}
                      size={24}
                      color="gray"
                    />
                  )}
                </p>
              </div>

              <div className="mb-4">
                <h2 className="text-xl text-gray-700 font-semibold mb-3">
                  Mô tả
                </h2>
                <p className="text-medium">{postingId.resortDescription}</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4 text-gray-700">
                <h2 className="text-lg font-semibold mb-3">
                  Các tiện năng và tiện nghi tại chỗ
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {postingId.resortAmenities
                    .filter((amenity) => amenity.type === "1")
                    .map((amenity) => (
                      <p
                        key={amenity.id}
                        className="text-medium flex gap-4  items-center before:content-[''] before:inline-block before:w-2 before:h-2 before:mr-2 before:bg-blue-500 before:rounded-full"
                      >
                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                        {amenity.name}
                      </p>
                    ))}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4 text-gray-700">
                <h2 className="text-lg font-semibold mb-4">
                  Các điểm tham quan gần đó
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {postingId.resortAmenities
                    .filter((amenity) => amenity.type === "2")
                    .map((amenity) => (
                      <p
                        key={amenity.id}
                        className="text-medium flex gap-4  items-center before:content-[''] before:inline-block before:w-2 before:h-2 before:mr-2 before:bg-blue-500 before:rounded-full"
                      >
                        {amenity.name}
                      </p>
                    ))}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4 text-gray-700">
                <h2 className="text-lg font-semibold mb-4">Chính sách</h2>
                <div className="grid grid-cols-3 gap-2">
                  {postingId.resortAmenities
                    .filter(
                      (amenity) => amenity.type !== "1" && amenity.type !== "2"
                    )
                    .map((amenity) => (
                      <p
                        key={amenity.id}
                        className="text-medium gap-4 flex items-center before:content-[''] before:inline-block before:w-2 before:h-2 before:mr-2 before:bg-blue-500 before:rounded-full"
                      >
                        {amenity.name}
                      </p>
                    ))}
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-xl text-gray-700 font-semibold mb-3">
                  Địa chỉ
                </h2>
                <img
                  src="https://placehold.co/600x300"
                  className="max-w-full "
                />
              </div>
            </div>
          </>
        ) : (
          <SpinnerWaiting />
        )}

        {/* Footer Section with Buttons */}
        <div className="p-4 border-t flex justify-between">
          <div>
            <button
              className="text-gray-700 px-4 py-2 rounded-lg mr-2 border border-gray-500 hover:bg-gray-200 transition duration-150"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
          <div className="border-t flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-8 py-2 rounded-xl hover:bg-green-600 transition duration-150"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRentalList;
