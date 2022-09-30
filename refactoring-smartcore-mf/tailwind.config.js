const path = require('path');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

const customPalettes = {
  brand: {
    "50": "#339f6a",
    "100": "#299560",
    "200": "#1f8b56",
    "300": "#15814c",
    "400": "#0b7742",
    "500": "#016d38",
    "600": "#00632e",
    "700": "#005924",
    "800": "#004f1a",
    "900": "#004510"
  },
  secondary: {
    "50": "#ffff8f",
    "100": "#ffff85",
    "200": "#fffa7b",
    "300": "#fff071",
    "400": "#ffe667",
    "500": "#ffdc5d",
    "600": "#f5d253",
    "700": "#ebc849",
    "800": "#e1be3f",
    "900": "#d7b435"
  }
};

/**
 * Tailwind configuration
 */
const config = {
  content    : ['./apps/**/*.{html,scss,ts}'],
  important  : true,
  theme      : {
      colors: {
        'transparent': colors.transparent,
        'black' : colors.black,
        'white' : colors.white,
        'gray'  : {
            ...colors.gray,
            DEFAULT: colors.gray[500]
        },
        'green'  : {
            ...colors.green,
            DEFAULT: colors.green[500]
        },
        'emerald'  : {
            ...colors.emerald,
            DEFAULT: colors.emerald[500]
        },
        'indigo'  : {
            ...colors.indigo,
            DEFAULT: colors.indigo[500]
        },
        'yellow'  : {
            ...colors.yellow,
            DEFAULT: colors.yellow[500]
        },
        'neutral'  : {
            ...colors.neutral,
            DEFAULT: colors.neutral[500]
        },
        'primary'  : {
            ...customPalettes.brand,
            DEFAULT: customPalettes.brand[500]
        },
        'accent'   : {
            ...customPalettes.secondary,
            DEFAULT: customPalettes.secondary[500]
        },
        'warn'     : {
            ...colors.red,
            DEFAULT: colors.red[600]
        },
        'on-warn': {
            500: colors.red['50']
        }
      },
      fontSize: {
          'xs'  : '0.625rem',
          'sm'  : '0.75rem',
          'md'  : '0.8125rem',
          'base': '0.875rem',
          'lg'  : '1rem',
          'xl'  : '1.125rem',
          '2xl' : '1.25rem',
          '3xl' : '1.5rem',
          '4xl' : '2rem',
          '5xl' : '2.25rem',
          '6xl' : '2.5rem',
          '7xl' : '3rem',
          '8xl' : '4rem',
          '9xl' : '6rem',
          '10xl': '8rem'
      },
      screens : {
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1440px'
      },
      extend  : {
          animation               : {
              'spin-slow': 'spin 3s linear infinite'
          },
          colors                  : {
              gray: colors.slate
          },
          flex                    : {
              '0': '0 0 auto'
          },
          opacity                 : {
              12: '0.12',
              38: '0.38',
              87: '0.87'
          },
          rotate                  : {
              '-270': '270deg',
              '15'  : '15deg',
              '30'  : '30deg',
              '60'  : '60deg',
              '270' : '270deg'
          },
          scale                   : {
              '-1': '-1'
          },
          zIndex                  : {
              '-1'   : -1,
              '49'   : 49,
              '60'   : 60,
              '70'   : 70,
              '80'   : 80,
              '90'   : 90,
              '99'   : 99,
              '999'  : 999,
              '9999' : 9999,
              '99999': 99999
          },
          spacing                 : {
              '13': '3.25rem',
              '15': '3.75rem',
              '18': '4.5rem',
              '22': '5.5rem',
              '26': '6.5rem',
              '30': '7.5rem',
              '50': '12.5rem',
              '90': '22.5rem',

              // Bigger values
              '100': '25rem',
              '120': '30rem',
              '128': '32rem',
              '140': '35rem',
              '160': '40rem',
              '180': '45rem',
              '192': '48rem',
              '200': '50rem',
              '240': '60rem',
              '256': '64rem',
              '280': '70rem',
              '320': '80rem',
              '360': '90rem',
              '400': '100rem',
              '480': '120rem',

              // Fractional values
              '1/2': '50%',
              '1/3': '33.333333%',
              '2/3': '66.666667%',
              '1/4': '25%',
              '2/4': '50%',
              '3/4': '75%'
          },
          minHeight               : ({theme}) => ({
              ...theme('spacing')
          }),
          maxHeight               : {
              none: 'none'
          },
          minWidth                : ({theme}) => ({
              ...theme('spacing'),
              screen: '100vw'
          }),
          maxWidth                : ({theme}) => ({
              ...theme('spacing'),
              screen: '100vw'
          }),
          transitionDuration      : {
              '400': '400ms'
          },
          transitionTimingFunction: {
              'drawer': 'cubic-bezier(0.25, 0.8, 0.25, 1)'
          },
          boxShadow: {
            '3xl': 'box-shadow: 2px 2px 7px #b8b8b7;'
          }
      }
  },
  corePlugins: {
      appearance        : false,
      container         : false,
      float             : false,
      clear             : false,
      placeholderColor  : false,
      placeholderOpacity: false,
      verticalAlign     : false
  },
  plugins    : [
  ]
};

module.exports = config;