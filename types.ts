/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  company: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  SERVICES = 'services',
  PORTFOLIO = 'portfolio',
  FEEDBACK = 'feedback',
  TEAM = 'team',
}

export interface Artist {
  id?: string;
  name: string;
  image: string;
  day: string;
  genre: string;
}