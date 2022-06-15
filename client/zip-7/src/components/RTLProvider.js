import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import rtl from 'stylis-plugin-rtl'

// NB: A unique `key` is important for it to work!
const options = {
  rtl: { key: 'css-he', stylisPlugins: [rtl] },
  ltr: { key: 'css-en' },
}

export const RTLProvider = ({ children }) => {
  const dir = "rtl"
  const cache = createCache(options[dir])
  return <CacheProvider value={cache} children={children} />
}