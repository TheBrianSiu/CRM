import { API_URL } from "@/settings";

const API_BASE_URL = API_URL;


export async function changePassword(email){
  try{
    const response = await fetch(`${API_BASE_URL}/changepassword/${email}`,{
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
    if(!response.ok){
      throw new Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}