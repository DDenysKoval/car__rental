import { Car } from "@/types/cars"
import { nextServer } from "./api"

export const fetchServerCarById = async (carId:string) => {
  try {
    const response = await nextServer.get<Car>(`/cars/${carId}`)
    return response.data
  } catch {
    throw new Error("Could'n fetch car details")
  }
}