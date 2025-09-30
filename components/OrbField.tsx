'use client'

import React from 'react';

type OrbFieldProps = {
  count?: number;
  seed?: string;
  className?: string;
};

function cyrb128(str: string) {
  let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ k, 597399067);
    h2 = Math.imul(h2 ^ k, 2869860233);
    h3 = Math.imul(h3 ^ k, 951274213);
    h4 = Math.imul(h4 ^ k, 2716044179);
  }
  h1 = (h1 ^ (h2 >>> 18)) >>> 0;
  h2 = (h2 ^ (h3 >>> 22)) >>> 0;
  h3 = (h3 ^ (h4 >>> 17)) >>> 0;
  h4 = (h4 ^ (h1 >>> 19)) >>> 0;
  return [h1, h2, h3, h4] as const;
}

function mulberry32(a: number) {
  return function() {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededRng(seed: string) {
  const [h1, h2, h3, h4] = cyrb128(seed);
  const mixed = (h1 ^ h2 ^ h3 ^ h4) >>> 0;
  return mulberry32(mixed || 1);
}

export default function OrbField({ count = 3, seed = 'orbfield', className = '' }: OrbFieldProps) {
  const rng = seededRng(seed);

  const colorClasses = [
    'bg-white dark:bg-sin-orange/20',
    'bg-white dark:bg-sin-yellow/20',
    'bg-white dark:bg-sin-red/20'
  ];

  const animationClasses = [
    'animate-float',
    'animate-float-delayed',
    'animate-float-slow'
  ];

  const orbs = Array.from({ length: count }).map((_, i) => {
    const r1 = rng();
    const r2 = rng();
    const r3 = rng();
    const r4 = rng();

    const size = Math.round(220 + r1 * 220); // 220px - 440px
    const topPct = Math.round(5 + r2 * 80);  // 5% - 85%
    const leftPct = Math.round(5 + r3 * 80); // 5% - 85%

    const color = colorClasses[Math.floor(r4 * colorClasses.length)];
    const anim = animationClasses[Math.floor(r2 * animationClasses.length)];

    return (
      <div
        key={i}
        className={`absolute rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-10 dark:opacity-30 ${color} ${anim}`}
        style={{ top: `${topPct}%`, left: `${leftPct}%`, width: size, height: size }}
        aria-hidden="true"
      />
    );
  });

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true" role="presentation">
      {orbs}
    </div>
  );
}