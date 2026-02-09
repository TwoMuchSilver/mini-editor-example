// app/api/v1/wedding-editor/[projectId]/rsvp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/shared/utils/supabase';

interface RouteContext {
  params: Promise<{ projectId: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { projectId } = await context.params;

    if (!projectId) {
      return NextResponse.json({ error: '프로젝트 ID가 필요합니다.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('rsvp')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('RSVP 목록 조회 오류:', error);
      return NextResponse.json({ error: 'RSVP 목록을 불러오는데 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ rsvps: data || [] });
  } catch (error) {
    console.error('RSVP 목록 조회 처리 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
