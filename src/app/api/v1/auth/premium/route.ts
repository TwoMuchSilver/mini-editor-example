// app/api/v1/auth/premium/route.ts — 사용자 프리미엄 상태 조회
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_COOKIE, getUserIdFromToken } from '@/shared/utils/authServer';
import { isUserPremium } from '@/shared/utils/userPremiumStorage';
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

  const userId = getUserIdFromToken(token);
  if (!userId) {
    return NextResponse.json(
      createErrorResponse(ErrorCodes.AUTH_UNAUTHORIZED, '인증이 필요합니다.'),
      { status: 401 }
    );
  }

  const isPremium = await isUserPremium(userId);
  return NextResponse.json(createSuccessResponse({ isPremium }, '프리미엄 상태를 조회했습니다.'));
}
