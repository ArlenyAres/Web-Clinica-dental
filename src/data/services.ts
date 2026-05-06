import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    description:
      'Professional-grade whitening that brightens your smile up to 8 shades in a single visit, with long-lasting results.',
    icon: 'whitening',
    slug: 'teeth-whitening',
    category: 'Cosmetic',
    featured: true,
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    description:
      'Permanent, natural-looking tooth replacements anchored directly to the jawbone for a confident, lasting smile.',
    icon: 'implants',
    slug: 'dental-implants',
    category: 'Restorative',
    featured: true,
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    description:
      'Clear aligners and traditional braces tailored to straighten your teeth discreetly and comfortably.',
    icon: 'orthodontics',
    slug: 'orthodontics',
    category: 'Cosmetic',
  },
  {
    id: 'root-canal',
    title: 'Root Canal',
    description:
      'Gentle, pain-free endodontic treatment that saves your natural tooth and eliminates infection quickly.',
    icon: 'root-canal',
    slug: 'root-canal',
    category: 'Restorative',
  },
  {
    id: 'preventive-care',
    title: 'Preventive Care',
    description:
      'Routine cleanings, exams and fluoride treatments that keep your smile healthy before problems arise.',
    icon: 'preventive',
    slug: 'preventive-care',
    category: 'Preventive',
  },
  {
    id: 'porcelain-veneers',
    title: 'Porcelain Veneers',
    description:
      'Ultra-thin ceramic shells bonded to the front of teeth to reshape, resize and perfect your smile.',
    icon: 'veneers',
    slug: 'porcelain-veneers',
    category: 'Cosmetic',
  },
];

export type ServiceCategory = 'All' | Service['category'];
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'All',
  'Cosmetic',
  'Restorative',
  'Preventive',
];
