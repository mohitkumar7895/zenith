import { CASE_STUDIES_DATA } from '@/lib/data';
import { ProjectCaseStudy } from './types';

export class ProjectModel {
  static getAll(): ProjectCaseStudy[] {
    return CASE_STUDIES_DATA;
  }

  static getById(id: string): ProjectCaseStudy | undefined {
    return CASE_STUDIES_DATA.find((p) => p.id === id);
  }
}
