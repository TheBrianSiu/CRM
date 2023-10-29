import { API_URL } from "@/settings";
import { fetchCustDataAndStoreLocal } from "./indexdb";

const API_BASE_URL = API_URL;

export async function Addcusts(customerdata) {
  try {
    const response = await fetch(`${API_BASE_URL}/customers-table/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerdata),
    });
    fetchCustDataAndStoreLocal();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData || "Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function retrievecustomers() {
  try {
    const response = await fetch(`${API_BASE_URL}/customers-table`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new error.message();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function removecustomer(id) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/customers-table/delete/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      },
    );
    fetchCustDataAndStoreLocal();
    if (!response.ok) {
      throw new error.message();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function retrievecustomersbyid(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/customers-table/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new error.message();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updatecustomers(id, updateddata) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/customers-table/update/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateddata),
      },
    );
    fetchCustDataAndStoreLocal();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData || "Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
