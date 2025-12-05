// src/theme/MDXComponents.js

import React from 'react'
import MDXComponents from '@theme-original/MDXComponents'
import IconGrid from './IconGrid'
import IconCard from './IconCard'

export default {
    // Re-use the default mapping
    ...MDXComponents,
    // Map custom tags to our components
    'icon-grid': IconGrid,
    'icon-card': IconCard,
}
