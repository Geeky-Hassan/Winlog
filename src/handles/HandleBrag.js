import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8000";

const redirectWithMessage = (message, isSuccess = true) => {
  const encodedMessage = encodeURIComponent(message);
  const status = isSuccess ? "success" : "error";
  window.location.href = `/?message=${encodedMessage}&status=${status}`;
};

export const AddBrag = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add_brag`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (response.data.status_code === 201) {
      redirectWithMessage("Brag added successfully!");
    }
    return response.data;
  } catch (error) {
    console.error("Error adding brag:", error);
    redirectWithMessage("Failed to add brag. Please try again.", false);
    throw error;
  }
};

export const UpdateBrag = async (formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/u_brag`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (response.data.status_code === 200) {
      redirectWithMessage("Brag updated successfully!");
    }
    return response.data;
  } catch (error) {
    console.error("Error updating brag:", error);
    redirectWithMessage("Failed to update brag. Please try again.", false);
    throw error;
  }
};

export const DeleteBrag = async (title) => {
  try {
    const response = await axios.delete(`${BASE_URL}/d_brags`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
      data: { brag_title: title.trim() },
    });
    if (response.data.status_code === 200) {
      redirectWithMessage("Brag deleted successfully!");
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting brag:", error);
    redirectWithMessage("Failed to delete brag. Please try again.", false);
    throw error;
  }
};

export const RevertBrag = async (values) => {
  try {
    const response = await axios.post(`${BASE_URL}/r_brags`, values, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (response.data.status_code === 200) {
      redirectWithMessage("Brag reverted successfully!");
    }
    return response.data;
  } catch (error) {
    console.error("Error reverting brag:", error);
    redirectWithMessage("Failed to revert brag. Please try again.", false);
    throw error;
  }
};

export const GetBrags = async (includeSoftDeleted = false) => {
  try {
    const response = await axios.get(`${BASE_URL}/g_brags`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      params: {
        include_soft_deleted: includeSoftDeleted,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching brags:", error);
    throw error;
  }
};
