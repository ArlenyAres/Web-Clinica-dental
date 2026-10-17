import type { GalleryItem } from '../types';

export const galleryItems: GalleryItem[] = [
  {
    id: 'g-1',
    imageUrl:
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
    altText: 'Smile transformation before and after',
    category: 'Before & After',
    caption: 'Complete smile makeover with porcelain veneers',
  },
  {
    id: 'g-2',
    imageUrl:
      'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&q=80',
    altText: 'Dental treatment in progress',
    category: 'Treatments',
    caption: 'Professional teeth whitening session',
  },
  {
    id: 'g-3',
    imageUrl:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
    altText: 'Modern dental clinic interior',
    category: 'Clinic',
    caption: 'Our state-of-the-art treatment room',
  },
  {
    id: 'g-4',
    imageUrl:
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80',
    altText: 'Before and after orthodontics',
    category: 'Before & After',
    caption: 'Invisalign treatment — 12 months result',
  },
  {
    id: 'g-5',
    imageUrl:
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=80',
    altText: 'Dental implant procedure',
    category: 'Treatments',
    caption: 'Precision dental implant placement',
  },
  {
    id: 'g-6',
    imageUrl:
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
    altText: 'Reception and waiting area',
    category: 'Clinic',
    caption: 'Welcoming reception and lounge',
  },
  {
    id: 'g-7',
    imageUrl:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    altText: 'Teeth whitening result',
    category: 'Before & After',
    caption: '8-shade whitening in a single visit',
  },
  {
    id: 'g-8',
    imageUrl:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    altText: 'Dentist consulting with patient',
    category: 'Treatments',
    caption: 'Personalised treatment consultation',
  },
  {
    id: 'g-9',
    imageUrl:
      'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=600&q=80',
    altText: 'Dental equipment close up',
    category: 'Clinic',
    caption: 'Digital X-ray and diagnostic suite',
  },
];

export type GalleryCategory = 'All' | 'Before & After' | 'Treatments' | 'Clinic';
export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Before & After',
  'Treatments',
  'Clinic',
];
