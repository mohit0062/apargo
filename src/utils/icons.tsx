import * as Lucide from 'lucide-react'
import React from 'react'

export function getLucideIcon(iconName: string): React.ComponentType<any> {
  if (!iconName) return Lucide.HelpCircle;
  // Strip "Icon" suffix if it is present (e.g. "GlobeIcon" -> "Globe")
  const cleanName = iconName.endsWith('Icon') ? iconName.slice(0, -4) : iconName;
  const IconComponent = (Lucide as any)[cleanName] || (Lucide as any)[iconName] || Lucide.HelpCircle;
  return IconComponent;
}
