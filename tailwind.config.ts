import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'thymia-purple' : "#8A69D4"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config

//THYMIA PURPLE
//  #8A69D4
//  hsl(258.5,55.44%,62.16%)
//  rgb(138,105,212)

// THYMIA BACKGROUND
//  #F0EEFF
//  hsl(247.06,100%,96.67%)
//  rgb(240,238,255)