import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";
import { Car } from "@/types/cars";

export async function GET(request: NextRequest) {
  try {
    const brand = request.nextUrl.searchParams.get("brand") ?? "";
    const page = Number(request.nextUrl.searchParams.get("page") ?? "");
    const rentalPrice = Number(request.nextUrl.searchParams.get("rentalPrice") ?? "");
    const minMileage = Number(request.nextUrl.searchParams.get("minMileage") ?? "");
    const maxMileage = Number(request.nextUrl.searchParams.get("maxMileage") ?? "");
    const limit = Number(request.nextUrl.searchParams.get("limit") ?? 12)

    const response = await api.get("/cars",{
      params:
      {
        ...(brand && { brand }),
        ...(rentalPrice && { rentalPrice }),
        ...(minMileage && { minMileage }),
        ...(maxMileage && { maxMileage }),
        page,
        limit,
      }
    })
    

    return NextResponse.json(response.data ,  {status:response.status})
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500}
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}