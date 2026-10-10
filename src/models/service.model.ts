import { SERVICES_DATA } from '@/lib/data';
import { Service } from './types';

export class ServiceModel {
  static getAll(): Service[] {
    return SERVICES_DATA;
  }

  static getBySlug(slug: string): Service | undefined {
    return SERVICES_DATA.find((s) => s.slug === slug || s.id === slug);
  }

  static getCategories(): string[] {
    return Array.from(new Set(SERVICES_DATA.map((s) => s.title)));
  }
}
