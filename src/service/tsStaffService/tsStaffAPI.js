import axiosConfig from "../../util/axiosCustomize/axiosConfig";

const getAllRentalPosting = async (
  pageNo = 0,
  pageSize = 3,
  roomInfoCode = "",
  packageId = null
) => {
  try {
    return await axiosConfig.get(`timeshare-staff/rental/postings`, {
      params: {
        pageNo,
        pageSize,
        roomInfoCode,
        packageId,
      },
    });
  } catch (error) {
    throw error;
  }
};

const getRentalPostingById = async (postingId) => {
  try {
    return await axiosConfig.get(`timeshare-staff/rental/posting/${postingId}`);
  } catch (error) {
    throw error;
  }
};

const rejectRentalPostingById = async (data, postingId) => {
  try {
    return await axiosConfig.post(
      `timeshare-staff/rental/posting/reject/${postingId}`,
      { data }
    );
  } catch (error) {
    throw error;
  }
};

const approveRentalPostingById = async (postingId, data) => {
  try {
    return await axiosConfig.post(
      `timeshare-staff/rental/posting/approval/${postingId}`,
      data
    );
  } catch (error) {
    throw error;
  }
};

const getAllBooking = async (
  pageNo = 0,
  pageSize = 3,
  isComing = false,
  willGo = false
) => {
  try {
    return await axiosConfig.get(`timeshare-staff/booking`, {
      params: {
        pageNo,
        pageSize,
        isComing,
        willGo,
      },
    });
  } catch (error) {
    throw error;
  }
};

const getAllExchangePosting = async (
  pageNo = 0,
  pageSize = 3,
  roomInfoCode = ""
) => {
  try {
    return await axiosConfig.get(`timeshare-staff/exchange/postings`, {
      params: {
        pageNo,
        pageSize,
        roomInfoCode,
      },
    });
  } catch (error) {
    throw error;
  }
};

const getExchangePostingById = async (postingId) => {
  try {
    return await axiosConfig.get(
      `timeshare-staff/exchange/posting/${postingId}`
    );
  } catch (error) {
    throw error;
  }
};

const rejectExchangePostingById = async (data, postingId) => {
  try {
    return await axiosConfig.post(
      `timeshare-staff/exchange/posting/reject/${postingId}`,
      { data }
    );
  } catch (error) {
    throw error;
  }
};

const approveExchangePostingById = async (postingId, data) => {
  try {
    return await axiosConfig.post(
      `timeshare-staff/exchange/posting/approval/${postingId}`,
      data
    );
  } catch (error) {
    throw error;
  }
};

const getRentalBookingById = async (bookingId) => {
  try {
    return await axiosConfig.get(`timeshare-staff/booking/rental/${bookingId}`);
  } catch (error) {
    throw error;
  }
};

const getExchangeBookingById = async (bookingId) => {
  try {
    return await axiosConfig.get(
      `timeshare-staff/booking/exchange/${bookingId}`
    );
  } catch (error) {
    throw error;
  }
};

export {
  getAllRentalPosting,
  getRentalPostingById,
  rejectRentalPostingById,
  approveRentalPostingById,
  getAllBooking,
  getAllExchangePosting,
  getExchangePostingById,
  rejectExchangePostingById,
  approveExchangePostingById,
  getRentalBookingById,
  getExchangeBookingById,
};
