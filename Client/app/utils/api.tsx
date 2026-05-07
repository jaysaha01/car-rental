import axios from 'axios';

interface useData {
  name?: string;
  email: string;
  phone?: string;
  usertype?: string;
  password: string
}

interface vehicleData {
  vehicletype: string,
  brand: string,
  model: string,
  year: number,
  fueltype: string,
  transmission: string,
  seats: number,
  location: string,
  priceperday: number,
  priceperweek: number,
  pricepermonth: number,
  features: string[]
  file: File[]
}

interface vehicleBookData {
  startDate: string,
  endDate: string,
  cost: number,
  serviceFee: number,
  tax: number,
  total: number,
  payment: boolean
}

interface profileData {
  name: string
}


const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});


export async function createUser(data: useData): Promise<any> {
  try {
    const response = await instance.post("auth/createaccount", data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(data: useData): Promise<any> {
  try {
    const response = await instance.post("auth/loginaccount", data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function submitVehicle(data: FormData): Promise<any> {
  try {
    const response = await instance.post("api/add-vehicle", data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function viewOwnerVehicle(): Promise<any> {
  try {
    const response = await instance.get("api/owner-vehicles");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteOwnerVehicle(id: string): Promise<any> {
  try {
    const response = await instance.delete(`api/delete-vehicle/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function showAllVehicle(filters: {
  search?: string;
  vehicletype?: string;
  fueltype?: string;
  transmission?: string;
}): Promise<any> {
  try {
    const response = await instance.get("api/show-vehicles", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function showVehicle(vID: string): Promise<any> {
  try {
    const response = await instance.get(`api/show-vehicle/${vID}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function bookVehicle(vID: string, data: vehicleBookData): Promise<any> {
  try {
    const response = await instance.post(`api/book-vehicle/${vID}`, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function adminDashboardData(): Promise<any> {
  try {
    const response = await instance.get("api/admin/dashboard");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function userData(): Promise<any> {
  try {
    const response = await instance.get("api/all-users");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function bookingData(): Promise<any> {
  try {
    const response = await instance.get("api/show-bookings");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function allVehicles(filters: any): Promise<any> {
  try {
    const response = await instance.get("api/all-vehicles", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function allAdminVehicles(): Promise<any> {
  try {
    const response = await instance.get("api/all-admin-vehicles");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function allHomeVehicles(): Promise<any> {
  try {
    const response = await instance.get("api/all-home-vehicles");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function approveVehicle(vid: string, status: string): Promise<any> {
  try {
    const response = await instance.put(`api/approve-vehicle/${vid}/${status}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function ownerVehicleBookings(): Promise<any> {
  try {
    const response = await instance.get("api/requested-vehicles");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function acceptRejectBookings(id: string, status: string): Promise<any> {
  try {
    const response = await instance.put(`api/accept-or-reject/${id}/${status}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function profileData(): Promise<any> {
  try {
    const response = await instance.get("auth/profile");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function adminDashboard(): Promise<any> {
  try {
    const response = await instance.get("api/owner-dashboard");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function renterBookigVehicle(): Promise<any> {
  try {
    const response = await instance.get("api/view-renter-vehicle");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function cancleBookigVehicle(bid: string): Promise<any> {
  try {
    const response = await instance.put(`api/cancel-vehicle/${bid}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export const editVehicle = async (vehicleId: string, formData: FormData) => {
  try {
    const response = await instance.post(`api/edit-vehicle/${vehicleId}`, formData)  // ✅ fixed
    return response
  } catch (error) {
    throw error;
  }
}

export const getVehicleById = async (vehicleId: string) => {
  try {
    const response = await instance.get(`api/view-my-vehicles/${vehicleId}`)  // ✅ fixed
    return response
  } catch (err) {
    throw err;
  }
}

export const paymeyVehicle = async (amount: number | string) => {
  try {
    const amountInPaisa = Math.round(Number(amount))
    const response = await instance.post(`api/payment-vehicle/${amountInPaisa}`)  // ✅ fixed
    return response
  } catch (err) {
    throw err
  }
}

export const searchUser = async (searchTerm: string) => {
  try {
    const response = await instance.post(`api/search-user/${searchTerm}`);  // ✅ fixed
    return response;
  } catch (err) {
    throw err;
  }
}

export const deleteUser = async (searchTerm: string) => {
  try {
    const response = await instance.delete(`api/delete-user/${searchTerm}`);  // ✅ fixed
    return response;
  } catch (err) {
    throw err;
  }
}

export const renterDashboardData = async () => {
  try {
    const response = await instance.get("api/renter-dashboard");  // ✅ fixed
    return response;
  } catch (err) {
    throw err;
  }
}

export const updateProfile = async (data: profileData) => {
  try {
    const response = await instance.post("auth/updateaccount", data);  // ✅ fixed
    return response;
  } catch (err) {
    throw err;
  }
}

export const signOut = async () => {
  try {
    const response = await instance.post("auth/logout");  // ✅ fixed
    return response;
  } catch (err) {
    throw err;
  }
}