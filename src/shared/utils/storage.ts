import { Block, GlobalTheme } from "@/shared/types/block";

export interface ProjectData {
  blocks: Block[];
  theme: GlobalTheme;
}

// Storage 인터페이스 (나중에 DB로 교체 가능)
export interface ProjectStorage {
  create(blocks: Block[], theme: GlobalTheme): string;
  update(id: string, blocks: Block[], theme: GlobalTheme): void;
  load(id: string): ProjectData | null;
  exists(id: string): boolean;
}

// 로컬스토리지 구현
class LocalStorageProjectStorage implements ProjectStorage {
  private getKey(id: string): string {
    return `wedding_${id}`;
  }

  create(blocks: Block[], theme: GlobalTheme): string {
    const id = Math.random().toString(36).substr(2, 9);
    this.update(id, blocks, theme);
    return id;
  }

  update(id: string, blocks: Block[], theme: GlobalTheme): void {
    const projectData: ProjectData = {
      blocks,
      theme
    };
    localStorage.setItem(this.getKey(id), JSON.stringify(projectData));
  }

  load(id: string): ProjectData | null {
    const data = localStorage.getItem(this.getKey(id));
    if (!data) return null;
    
    const parsed = JSON.parse(data);
    
    // 하위 호환성: 이전에 블록만 저장한 경우
    if (Array.isArray(parsed)) {
      return {
        blocks: parsed,
        theme: {
          backgroundColor: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
          primaryColor: '#6366f1'
        }
      };
    }
    
    return parsed as ProjectData;
  }

  exists(id: string): boolean {
    return localStorage.getItem(this.getKey(id)) !== null;
  }
}

// 싱글톤 인스턴스 (나중에 DB 구현으로 교체 가능)
export const projectStorage: ProjectStorage = new LocalStorageProjectStorage();

// 편의 함수들 (기존 API 호환성 유지)
export const createProject = (blocks: Block[], theme: GlobalTheme): string => {
  return projectStorage.create(blocks, theme);
};

export const updateProject = (id: string, blocks: Block[], theme: GlobalTheme): void => {
  projectStorage.update(id, blocks, theme);
};

export const loadProject = (id: string): ProjectData | null => {
  return projectStorage.load(id);
};

export const projectExists = (id: string): boolean => {
  return projectStorage.exists(id);
};

// 하위 호환성을 위한 함수 (deprecated)
export const saveProject = (blocks: Block[], theme: GlobalTheme): string => {
  return createProject(blocks, theme);
};
