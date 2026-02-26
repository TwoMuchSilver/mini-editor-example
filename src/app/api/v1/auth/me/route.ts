import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_BASE_URL, AUTH_COOKIE, getTokenExpiration } from '@/shared/utils/authServer';
import { createSuccessResponse, createErrorResponse, ErrorCodes } from '@/shared/types/apiResponse';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (!token) {
    return NextResponse.json(
      createErrorResponse(ErrorCodes.AUTH_UNAUTHORIZED, '인증이 필요합니다.'),
      { status: 401 }
    );
  }

  const res = await fetch(`${AUTH_BASE_URL}/api/v1/auth/members/user-info`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'X-Client-Type': 'web',
    },
  });

  const apiRes = (await res.json()) as { success: boolean; code: string; message: string; data?: { userId?: number; id?: string; email?: string; nickname?: string } };

  if (res.ok) {
    const expiresAt = getTokenExpiration(token);
    const raw = apiRes.data ?? {};
    const user = { id: String(raw.userId ?? raw.id ?? ''), email: raw.email, nickname: raw.nickname };
    return NextResponse.json(createSuccessResponse({ user, expiresAt }, '요청이 성공적으로 처리되었습니다.'));
  }

  return NextResponse.json(apiRes, { status: res.status });
}
