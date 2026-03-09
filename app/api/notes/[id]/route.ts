import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;

    const cookieStore = await cookies();
    const cookie = cookieStore.toString();

    const res = await api.get(`/notes/${id}`, {
      headers: {
        Cookie: cookie,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const body = await req.json();

    const cookieStore = await cookies();
    const cookie = cookieStore.toString();

    const res = await api.patch(`/notes/${id}`, body, {
      headers: {
        Cookie: cookie,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;

    const cookieStore = await cookies();
    const cookie = cookieStore.toString();

    const res = await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookie,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}