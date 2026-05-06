/* ============================================================
   Types — Alloy Dental domain interfaces
   ============================================================ */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;          // SVG path string or icon key
  slug: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorPhotoUrl?: string;
  role?: string;         // e.g. "Patient since 2020"
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  altText: string;
  category: string;      // used for filter bar
  caption?: string;
}
