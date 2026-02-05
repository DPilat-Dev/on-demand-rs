'use client';

import { useState, useEffect } from "react";
import { IconType } from "react-icons/lib";

interface DynamicIconProps  {
    iconName: string;
    size?: number; 
    color?: string;
    className?: string;
  };

  const iconLibraries: Record<string, () => Promise<{ [key: string]: IconType }>> = {
    ai: () => import("react-icons/ai").then((mod) => Object.assign({}, mod)),
    bs: () => import("react-icons/bs").then((mod) => Object.assign({}, mod)),
    bi: () => import("react-icons/bi").then((mod) => Object.assign({}, mod)),
    ci: () => import("react-icons/ci").then((mod) => Object.assign({}, mod)),
    cg: () => import("react-icons/cg").then((mod) => Object.assign({}, mod)),
    di: () => import("react-icons/di").then((mod) => Object.assign({}, mod)),
    fi: () => import("react-icons/fi").then((mod) => Object.assign({}, mod)),
    fc: () => import("react-icons/fc").then((mod) => Object.assign({}, mod)),
    fa: () => import("react-icons/fa").then((mod) => Object.assign({}, mod)),
    fa6: () => import("react-icons/fa6").then((mod) => Object.assign({}, mod)),
    gi: () => import("react-icons/gi").then((mod) => Object.assign({}, mod)),
    go: () => import("react-icons/go").then((mod) => Object.assign({}, mod)),
    gr: () => import("react-icons/gr").then((mod) => Object.assign({}, mod)),
    hi: () => import("react-icons/hi").then((mod) => Object.assign({}, mod)),
    hi2: () => import("react-icons/hi2").then((mod) => Object.assign({}, mod)),
    im: () => import("react-icons/im").then((mod) => Object.assign({}, mod)),
    lia: () => import("react-icons/lia").then((mod) => Object.assign({}, mod)),
    io: () => import("react-icons/io").then((mod) => Object.assign({}, mod)),
    io5: () => import("react-icons/io5").then((mod) => Object.assign({}, mod)),
    lu: () => import("react-icons/lu").then((mod) => Object.assign({}, mod)),
    md: () => import("react-icons/md").then((mod) => Object.assign({}, mod)),
    pi: () => import("react-icons/pi").then((mod) => Object.assign({}, mod)),
    rx: () => import("react-icons/rx").then((mod) => Object.assign({}, mod)),
    ri: () => import("react-icons/ri").then((mod) => Object.assign({}, mod)),
    si: () => import("react-icons/si").then((mod) => Object.assign({}, mod)),
    sl: () => import("react-icons/sl").then((mod) => Object.assign({}, mod)),
    tb: () => import("react-icons/tb").then((mod) => Object.assign({}, mod)),
    tfi: () => import("react-icons/tfi").then((mod) => Object.assign({}, mod)),
    ti: () => import("react-icons/ti").then((mod) => Object.assign({}, mod)),
    vsc: () => import("react-icons/vsc").then((mod) => Object.assign({}, mod)),
    wi: () => import("react-icons/wi").then((mod) => Object.assign({}, mod)),
  };

// Function to extract library prefix (e.g., "Fa" from "FaBeer")
const extractLibraryPrefix = (iconName: string): string | null => {
  const match = iconName.match(/^([A-Z][a-z]*)(?=[A-Z])/);
  return match ? match[1].toLowerCase() : null;
};

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, size = 24, color = "white", className }) => {
  const [IconComponent, setIconComponent] = useState<IconType | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        // Validate iconName
        if (!iconName || typeof iconName !== "string") {
          console.error(`Invalid icon name: "${iconName}"`);
          return;
        }

        // Extract the library prefix (e.g., "fa" from "FaBeer")
        const libKey = extractLibraryPrefix(iconName);
        if (!libKey) {
          console.error(`❌ Error: Could not extract library from "${iconName}".`);
          return;
        }

        if (!(libKey in iconLibraries)) {
          console.error(`❌ Error: Icon library "${libKey}" not found. Check the prefix of "${iconName}".`);
          return;
        }

        // Dynamically import the required icon library
        const iconModule = await iconLibraries[libKey]();
        const LoadedIcon = iconModule[iconName as keyof typeof iconModule];

        if (LoadedIcon) {
          setIconComponent(() => LoadedIcon);
        } else {
          console.error(`❌ Error: Icon "${iconName}" not found in "${libKey}".`);
        }
      } catch (error) {
        console.error(`❌ Error loading icon "${iconName}":`, error);
      }
    };

    loadIcon();
  }, [iconName]);

  if (!IconComponent) {
    return <span style={{ color }}>⚠️ Icon &quot;{iconName}&quot; not found</span>;
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export default DynamicIcon;