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
        'default': '2px 2px 4px black',
        'lg': '4px 4px 8px black',
        'md':'2px 2px 4px black',
        'sm':'1px 1px 2px black',
      },
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
