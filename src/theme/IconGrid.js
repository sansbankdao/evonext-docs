// src/theme/IconGrid/index.js
import React from 'react';
import clsx from 'clsx';

export default function IconGrid({ children, columns = 3 }) {
  return (
    <div
      className={clsx(
        'icon-grid',
        `grid-cols-${columns}`
      )}
    >
      {children}
    </div>
  );
}
