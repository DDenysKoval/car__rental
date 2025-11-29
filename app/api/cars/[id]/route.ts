import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../api/api";
import { isAxiosError } from "axios";

import { Car } from "@/types/cars";
import { logErrorResponse } from "../../_utils/utils";

interface Props {
  params: Promise<{id:string}>
}

export async function GET(request: NextRequest, {params}:Props) {
  try {
    const { id } = await params;
    const response = await api.get<Car>(`/cars/${id}`);
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