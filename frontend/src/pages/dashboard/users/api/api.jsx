import { API_URL } from "@/settings"

const API_BASE_URL = API_URL;

export async function retrievedata(){
    try{
        const response = await fetch(`${API_BASE_URL}/users-table`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
        )
        if(!response.ok){
            throw new Error("Request failed");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteuser(id){
    try{
        const response = await fetch(`${API_BASE_URL}/users-table/delete/${id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        }
        )
        if(!response.ok){
            throw new Error("delete attempt is failed");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
    throw new Error(error.message);
  }
}


  export async function adduser(customerdata){
    try{
        const response = await fetch(`${API_BASE_URL}/users-table/add`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customerdata),
        }
        )
        if(!response.ok){
            throw new Error("Request failed");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
    throw new Error(error.message);
  }
}

  export async function supervisor(){
    try{
        const response = await fetch(`${API_BASE_URL}/users-table/supervisor`,{
            method: "GET",
            headers: {"content-Type": "applciation/json"},
        }
        )
        if(!response.ok){
            throw new Error("Request failed");
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        throw new Error(error.message);
    }
}

    export async function retreivedatabyid(id){
        try{
            const response = await fetch(`${API_BASE_URL}/users-table/${id}`,{
                method: "GET",
                header: {"content-Type": "application/json"},
            })
            if(!response.ok){
                throw new Error("Request failed");
            }
            const data = await response.json();
            return data;
        }
        catch(error){
            throw new Error(error.message);
        }
    } 

    export async function updateuser(id, updateddata){
        try{
            const response = await fetch(`${API_BASE_URL}/users-table/update/${id}`,{
                method: "PUT",
                header: {"content-Type": "application/json"},
                body: JSON.stringify(updateddata)
            })
            if(!response.ok){
                throw new Erorr(error.message);
            }
            const data = await response.json();
            return data;
        }
        catch(error){
            throw new Error(error.message);
        }
    }






