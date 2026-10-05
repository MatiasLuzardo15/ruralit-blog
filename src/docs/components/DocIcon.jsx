import React from 'react';
import {
  BadgeCheck, BarChart3, BookOpen, Folder, FileText, Footprints, LifeBuoy, Package, Receipt,
  ShieldCheck, Upload, UserCog, Users, Zap,
} from 'lucide-react';

/** Los nombres que usa `categories.js`. */
const ICONS = {
  BadgeCheck, BarChart3, BookOpen, Folder, FileText, Footprints, LifeBuoy, Package, Receipt,
  ShieldCheck, Upload, UserCog, Users, Zap,
};

export default function DocIcon({ name, size = 18, strokeWidth = 1.75, className }) {
  const Icon = ICONS[name] ?? BookOpen;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}
