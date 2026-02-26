import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_COOKIE, REFRESH_TOKEN_COOKIE } from '@/shared/utils/authServer';
import { createSuccessResponse } from '@/shared/types/apiResponse';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
  return NextResponse.json(createSuccessResponse(null, '로그아웃 되었습니다.'));
}
