import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    breakpoints: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '50%': '50%',
      '100': '100%',
    },
  },
  rules: [
    ['text-bottom-decorate-blue', { 'background-image': 'linear-gradient(126.83deg,rgba(22, 132, 252, 1) 6.77%,rgba(255, 255, 255, 0) 85.31%,rgba(255, 255, 255, 0) 85.31%)' }],
    ['min-h-screen-260', { 'min-height': 'calc(100vh - 260px)' }],
    ['bg-gradient-blue', { 'background-image': ' linear-gradient(139.61deg, rgba(47,119,201,1) 4.16%,rgba(62,143,236,1) 122.08%);', 'color': '#fff' }],
  ],
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    // presetWebFonts({
    //   fonts: {
    //     sans: 'DM Sans',
    //     serif: 'DM Serif Display',
    //     mono: 'DM Mono',
    //   },
    // }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
