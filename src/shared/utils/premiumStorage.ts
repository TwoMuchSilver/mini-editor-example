// shared/utils/premiumStorage.ts
// 프리미엄 상태를 로컬스토리지에 저장/조회하는 유틸리티

const PREMIUM_STORAGE_KEY = 'wedding_premium_projects';

interface PremiumProject {
  projectId: string;
  code: string;
  unlockedAt: string; // ISO 8601 timestamp
}

interface PremiumStorage {
  [projectId: string]: {
    code: string;
    unlockedAt: string;
  };
}

/**
 * 특정 프로젝트가 프리미엄인지 확인
 */
export function isPremiumProject(projectId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const storage = localStorage.getItem(PREMIUM_STORAGE_KEY);
    if (!storage) return false;
    
    const premiumProjects: PremiumStorage = JSON.parse(storage);
    return !!premiumProjects[projectId];
  } catch (error) {
    console.error('프리미엄 상태 확인 오류:', error);
    return false;
  }
}

/**
 * 프로젝트를 프리미엄으로 등록
 */
export function setPremiumProject(projectId: string, code: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const storage = localStorage.getItem(PREMIUM_STORAGE_KEY);
    const premiumProjects: PremiumStorage = storage ? JSON.parse(storage) : {};
    
    premiumProjects[projectId] = {
      code,
      unlockedAt: new Date().toISOString(),
    };
    
    localStorage.setItem(PREMIUM_STORAGE_KEY, JSON.stringify(premiumProjects));
  } catch (error) {
    console.error('프리미엄 상태 저장 오류:', error);
  }
}

/**
 * 특정 프로젝트의 프리미엄 정보 조회
 */
export function getPremiumInfo(projectId: string): PremiumProject | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const storage = localStorage.getItem(PREMIUM_STORAGE_KEY);
    if (!storage) return null;
    
    const premiumProjects: PremiumStorage = JSON.parse(storage);
    const info = premiumProjects[projectId];
    
    if (!info) return null;
    
    return {
      projectId,
      code: info.code,
      unlockedAt: info.unlockedAt,
    };
  } catch (error) {
    console.error('프리미엄 정보 조회 오류:', error);
    return null;
  }
}

/**
 * 모든 프리미엄 프로젝트 목록 조회
 */
export function getAllPremiumProjects(): PremiumProject[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const storage = localStorage.getItem(PREMIUM_STORAGE_KEY);
    if (!storage) return [];
    
    const premiumProjects: PremiumStorage = JSON.parse(storage);
    
    return Object.entries(premiumProjects).map(([projectId, info]) => ({
      projectId,
      code: info.code,
      unlockedAt: info.unlockedAt,
    }));
  } catch (error) {
    console.error('프리미엄 프로젝트 목록 조회 오류:', error);
    return [];
  }
}

/**
 * 특정 프로젝트의 프리미엄 상태 제거 (테스트용)
 */
export function removePremiumProject(projectId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const storage = localStorage.getItem(PREMIUM_STORAGE_KEY);
    if (!storage) return;
    
    const premiumProjects: PremiumStorage = JSON.parse(storage);
    delete premiumProjects[projectId];
    
    localStorage.setItem(PREMIUM_STORAGE_KEY, JSON.stringify(premiumProjects));
  } catch (error) {
    console.error('프리미엄 상태 제거 오류:', error);
  }
}
