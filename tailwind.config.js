/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      minWidth: {
        '300': '300px',
        '400': '400px',
        '500': '500px',
        '600': '600px',
        '700': '700px',
      },
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'lg': '4px 4px 8px rgba(0, 0, 0, 0.5)',
        'md':'2px 2px 4px rgba(0, 0, 0, 0.5)',
        'sm':'1px 1px 2px rgba(0, 0, 0, 0.5)',
        'lg-light':'4px 4px 8px rgba(0, 0, 0, 0.2)',
        'mg-light':'2px 2px 4px rgba(0, 0, 0, 0.2)',
        'sm-light':'1px 1px 2px rgba(0, 0, 0, 0.2)',
        'lg-dark': '4px 4px 8px rgba(0, 0, 0, 0.7)',
        'mg-dark':'2px 2px 4px rgba(0, 0, 0, 0.7)',
        'sm-dark':'1px 1px 2px rgba(0, 0, 0, 0.7)',
      },
      dropShadow: {
        'sm-semi-dark': '1px 1px 2px rgba(0, 0, 0, 0.5)',
        'md-semi-dark': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'lg-semi-dark': '4px 4px 8px rgba(0, 0, 0, 0.5)',        
        'sm-dark': '1px 1px 1px rgba(0, 0, 0, 0.8)',
        'md-dark': '2px 2px 4px rgba(0, 0, 0, 0.8)',
        'lg-dark': '4px 4px 8px rgba(0, 0, 0, 0.8)',    
      }
    },
  },
  plugins: [
    function ({ addUtilities, config, e }) {
      const textShadowUtilities = Object.entries(config('theme.textShadow')).reduce((acc, [modifier, value]) => {
        const className = e(`text-shadow-${modifier}`);
        acc[`.${className}`] = {
          'text-shadow': value,
        };
        return acc;
      }, {});
      addUtilities(textShadowUtilities, ['responsive', 'hover']);
    },
  ],
}
