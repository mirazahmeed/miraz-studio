import React from "react";

interface ArtworkProps {
  className?: string;
  isActive?: boolean;
}

/**
 * 01 - Mission Artwork: Mint / Emerald / Teal Atmospheric Radiant Geometry
 */
export function MissionArtwork({ className = "", isActive = false }: ArtworkProps) {
  return (
    <svg
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Soft atmospheric radial glow */}
        <radialGradient id="mint-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.75" />
          <stop offset="35%" stopColor="#34D399" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="teal-ambient" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#0D9488" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0F766E" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="emerald-facet-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
        </linearGradient>

        <linearGradient id="emerald-facet-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="emerald-facet-3" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#047857" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#34D399" stopOpacity="0.7" />
        </linearGradient>

        <filter id="soft-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="22" result="blur" />
        </filter>

        <filter id="mesh-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="12" result="blur" />
        </filter>
      </defs>

      {/* Atmospheric Ambient Glow */}
      <circle cx="160" cy="125" r="95" fill="url(#mint-glow)" filter="url(#soft-blur)" />
      <ellipse cx="145" cy="115" rx="75" ry="60" fill="url(#teal-ambient)" filter="url(#mesh-blur)" />

      {/* Translucent Geometric Crystalline Facets */}
      <g opacity={isActive ? 0.95 : 0.85} className="transition-opacity duration-500">
        {/* Top left diamond facet */}
        <polygon
          points="160,55 208,95 160,135 112,95"
          fill="url(#emerald-facet-1)"
          stroke="#A7F3D0"
          strokeWidth="0.75"
          strokeOpacity="0.6"
        />

        {/* Right facet */}
        <polygon
          points="208,95 242,145 194,180 160,135"
          fill="url(#emerald-facet-2)"
          stroke="#6EE7B7"
          strokeWidth="0.75"
          strokeOpacity="0.5"
        />

        {/* Left facet */}
        <polygon
          points="112,95 160,135 126,180 78,145"
          fill="url(#emerald-facet-3)"
          stroke="#34D399"
          strokeWidth="0.75"
          strokeOpacity="0.5"
        />

        {/* Bottom diamond facet */}
        <polygon
          points="160,135 194,180 160,215 126,180"
          fill="url(#emerald-facet-1)"
          stroke="#6EE7B7"
          strokeWidth="0.75"
          strokeOpacity="0.6"
        />

        {/* Central luminous core */}
        <circle cx="160" cy="135" r="14" fill="#FFFFFF" fillOpacity="0.65" filter="url(#mesh-blur)" />
        <circle cx="160" cy="135" r="3" fill="#FFFFFF" fillOpacity="0.9" />
      </g>
    </svg>
  );
}

/**
 * 02 - Why Miraz Studio Artwork: Warm Gold / Amber Isometric Faceted Ribbon Architecture
 */
export function WhyStudioArtwork({ className = "", isActive = false }: ArtworkProps) {
  return (
    <svg
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Warm Golden Ambient Glow */}
        <radialGradient id="gold-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="gold-plane-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.75" />
        </linearGradient>

        <linearGradient id="gold-plane-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="gold-plane-3" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.65" />
        </linearGradient>

        <filter id="gold-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="20" result="blur" />
        </filter>
      </defs>

      {/* Atmospheric Soft Light */}
      <circle cx="165" cy="130" r="85" fill="url(#gold-glow)" filter="url(#gold-soft)" />

      {/* Isometric Geometric Step/Ribbon Construction matching reference style */}
      <g
        opacity={isActive ? 1 : 0.9}
        transform="translate(10, 0)"
        className="transition-opacity duration-500"
      >
        {/* Tier 1 - Top Isometric Roof */}
        <polygon
          points="155,42 205,72 155,102 105,72"
          fill="url(#gold-plane-3)"
          stroke="#FEF3C7"
          strokeWidth="0.75"
          strokeOpacity="0.7"
        />

        {/* Tier 1 - Left Elevation */}
        <polygon
          points="105,72 155,102 155,142 105,112"
          fill="url(#gold-plane-2)"
          stroke="#F59E0B"
          strokeWidth="0.75"
          strokeOpacity="0.5"
        />

        {/* Tier 1 - Right Elevation */}
        <polygon
          points="155,102 205,72 205,112 155,142"
          fill="url(#gold-plane-1)"
          stroke="#FCD34D"
          strokeWidth="0.75"
          strokeOpacity="0.6"
        />

        {/* Tier 2 - Right Extended Wing (Z-fold structure) */}
        <polygon
          points="205,112 245,136 205,166 165,142"
          fill="url(#gold-plane-3)"
          stroke="#FEF3C7"
          strokeWidth="0.75"
          strokeOpacity="0.7"
        />
        <polygon
          points="205,166 245,136 245,176 205,206"
          fill="url(#gold-plane-1)"
          stroke="#FBBF24"
          strokeWidth="0.75"
          strokeOpacity="0.5"
        />

        {/* Tier 3 - Bottom Left Base */}
        <polygon
          points="105,112 155,142 155,182 105,152"
          fill="url(#gold-plane-1)"
          stroke="#FCD34D"
          strokeWidth="0.75"
          strokeOpacity="0.6"
        />
        <polygon
          points="105,152 155,182 115,206 65,176"
          fill="url(#gold-plane-3)"
          stroke="#FEF3C7"
          strokeWidth="0.75"
          strokeOpacity="0.6"
        />
        <polygon
          points="65,176 115,206 115,236 65,206"
          fill="url(#gold-plane-2)"
          stroke="#D97706"
          strokeWidth="0.75"
          strokeOpacity="0.5"
        />
        <polygon
          points="115,206 155,182 155,212 115,236"
          fill="url(#gold-plane-1)"
          stroke="#F59E0B"
          strokeWidth="0.75"
          strokeOpacity="0.4"
        />
      </g>
    </svg>
  );
}

/**
 * 03 - Our Work Artwork: Cobalt / Indigo / Cyan Stepped Geometric Ribbon Architecture
 */
export function WorkArtwork({ className = "", isActive = false }: ArtworkProps) {
  return (
    <svg
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Cobalt / Cyan Ambient Glow */}
        <radialGradient id="blue-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="blue-plane-top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="blue-plane-left" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.85" />
        </linearGradient>

        <linearGradient id="blue-plane-right" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.75" />
        </linearGradient>

        <filter id="blue-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="20" result="blur" />
        </filter>
      </defs>

      {/* Atmospheric Soft Light */}
      <circle cx="165" cy="130" r="85" fill="url(#blue-glow)" filter="url(#blue-soft)" />

      {/* Isometric Interlocking Ribbon Structure */}
      <g
        opacity={isActive ? 1 : 0.9}
        transform="translate(10, 0)"
        className="transition-opacity duration-500"
      >
        {/* Top Step Plane */}
        <polygon
          points="155,42 205,72 155,102 105,72"
          fill="url(#blue-plane-top)"
          stroke="#E0F2FE"
          strokeWidth="0.75"
          strokeOpacity="0.8"
        />

        {/* Top Step Left Face */}
        <polygon
          points="105,72 155,102 155,142 105,112"
          fill="url(#blue-plane-left)"
          stroke="#2563EB"
          strokeWidth="0.75"
          strokeOpacity="0.5"
        />

        {/* Top Step Right Face */}
        <polygon
          points="155,102 205,72 205,112 155,142"
          fill="url(#blue-plane-right)"
          stroke="#93C5FD"
          strokeWidth="0.75"
          strokeOpacity="0.6"
        />

        {/* Mid-level Right Extrusion */}
        <polygon
          points="205,112 245,136 205,166 165,142"
          fill="url(#blue-plane-top)"
          stroke="#E0F2FE"
          strokeWidth="0.75"
          strokeOpacity="0.8"
        />
        <polygon
          points="205,166 245,136 245,176 205,206"
          fill="url(#blue-plane-right)"
          stroke="#3B82F6"
          strokeWidth="0.75"
          strokeOpacity="0.5"
        />

        {/* Lower Left Stepped Segment */}
        <polygon
          points="105,112 155,142 155,182 105,152"
          fill="url(#blue-plane-right)"
          stroke="#60A5FA"
          strokeWidth="0.75"
          strokeOpacity="0.6"
        />
        <polygon
          points="105,152 155,182 115,206 65,176"
          fill="url(#blue-plane-top)"
          stroke="#E0F2FE"
          strokeWidth="0.75"
          strokeOpacity="0.7"
        />
        <polygon
          points="65,176 115,206 115,236 65,206"
          fill="url(#blue-plane-left)"
          stroke="#1E40AF"
          strokeWidth="0.75"
          strokeOpacity="0.5"
        />
        <polygon
          points="115,206 155,182 155,212 115,236"
          fill="url(#blue-plane-right)"
          stroke="#2563EB"
          strokeWidth="0.75"
          strokeOpacity="0.4"
        />
      </g>
    </svg>
  );
}
