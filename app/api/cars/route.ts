import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";
import { NextURL } from "next/dist/server/web/next-url";


export async function GET(request: NextRequest) {
  try {
    const brand = request.nextUrl.searchParams.get("brand") ?? "";
    const page = Number(request.nextUrl.searchParams.get("page") ?? "");
    const rentalPrice = Number(request.nextUrl.searchParams.get("rentalPrice") ?? "");
    const minMileage = Number(request.nextUrl.searchParams.get("minMileage") ?? "");
    const maxMileage = Number(request.nextUrl.searchParams.get("maxMileage") ?? "");

    const responce = await api.get("/cars",{
      params:
      {
        brand,
        rentalPrice,
        minMileage,
        maxMileage,
        page,
      }
    })
    console.log(responce);
    
    return NextResponse.json(responce.data, {status:responce.status})
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