import { NextResponse } from "next/server";
import * as Brand from "@/database/brands";
import { ServerError } from "@/lib/error";

export const GET = async (request: Request): Promise<Response> => {
  const brand = await Brand.getBrands();
  if (brand instanceof ServerError) {
    const response = new Response(brand.message, {
      status: brand.status,
    });
    return response;
  }
  return NextResponse.json(brand);
};

export const POST = async (request: Request): Promise<Response> => {
  const { name, picture } = await request.json();
  const brand = await Brand.createBrand({ name, picture });
  if (brand instanceof ServerError) {
    const response = new Response(brand.message, {
      status: brand.status,
    });
    return response;
  }
  return NextResponse.json(brand);
};
