const sizes = {
  up(size) {
    const sizes = {
      xl: '2100px',
      xxl: '3500px',
    };
    return `@media (min-width: ${sizes[size]})`;
  },
  down(size) {
    const sizes = {
      xs: '575.98px',
      sm: '767.98px',
      md: '991.98px',
      lg: '1199.98px',
      xl: '1600px',
    };
    return `@media (max-width: ${sizes[size]})`;
  },
};

export default sizes;
