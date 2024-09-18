import axios from "axios";
import toast from "react-hot-toast";

const showToastAndRedirect = (message, isSuccess = true) => {
  if (isSuccess) {
    toast.success(message);
  } else {
    toast.error(message);
  }
  setTimeout(() => {
    window.location.href = "/";
  }, 2000); // 3 seconds delay
};

export const AddBrag = async (formData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/add_brag",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    if (response.data.status_code === 201) {
      showToastAndRedirect("Brag added successfully!");
    }
    return response.data;
  } catch (error) {
    console.error("Error adding brag:", error);
    showToastAndRedirect("Failed to add brag. Please try again.", false);
    throw error;
  }
};

export const UpdateBrag = async (formData) => {
  try {
    const response = await axios.put("http://127.0.0.1:8000/u_brag", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (response.data.status_code === 201) {
      showToastAndRedirect("Brag updated successfully!");
    }
    return response.data;
  } catch (error) {
    console.error("Error updating brag:", error);
    showToastAndRedirect("Failed to update brag. Please try again.", false);
    throw error;
  }
};

export const DeleteBrag = async (title) => {
  try {
    const response = await axios.delete("http://127.0.0.1:8000/d_brags", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
      data: { brag_title: title.trim() }, // Trim the title before sending
    });
    if (response.data.status_code === 200) {
      return { success: true, message: response.data.detail };
    } else {
      return {
        success: false,
        message: response.data.detail || "Failed to delete brag.",
      };
    }
  } catch (error) {
    console.error("Error deleting brag:", error);
    return {
      success: false,
      message:
        error.response?.data?.detail ||
        "An error occurred while deleting the brag.",
    };
  }
};

export const RevertBrag = async (title) => {
  try {
    const response = await axios.delete("http://127.0.0.1:8000/r_brags", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      data: { brag_title: title },
    });
    if (response.data.status_code === 200) {
      showToastAndRedirect("Brag reverted successfully!");
    }
    return response.data;
  } catch (error) {
    console.error("Error reverting brag:", error);
    showToastAndRedirect("Failed to revert brag. Please try again.", false);
    throw error;
  }
};

export const GetBrags = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/g_brags", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching brags:", error);
    throw error;
  }
};
