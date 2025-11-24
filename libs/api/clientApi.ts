import { Car } from "@/types/cars";
import { nextServer } from "./api";

export interface AllCarsHttpResponse {
  cars: Car[],
  totalCars: number,
  page: number,
  totalPages: number,
}

export const fetchAllCars = async () => {
  try {
    const response = await nextServer.get<AllCarsHttpResponse>("/cars");
    return response.data;
  } catch {
    throw new Error("Fetch cars failed");
  }
}

export const fetchCarById = async (carId:number) => {
  try {
    const response = await nextServer.get<Car>(`/cars/${carId}`)
    return response.data
  } catch {
    throw new Error("Could'n fetch car details")
  }
}

export const fetchBrands = async () => { 
  try {
    const response = await nextServer.get<string[]>("/brands")
    return response.data;
  } catch {
    throw new Error("Fetch brands failed")
  }
};