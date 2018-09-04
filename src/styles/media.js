module.exports = (variables) => ({
  /* BREAKPOINTS */
  b_xs: `(max-width: ${variables.d_xs})`,
  b_sm: `(min-width: ${variables.d_sm})`,
  b_md: `(min-width: ${variables.d_md})`,
  b_lg: `(min-width: ${variables.d_lg})`,
  b_xl: `(min-width: ${variables.d_xl})`,
  b_sm_max: `(max-width: ${variables.d_sm_max})`,
  b_md_max: `(max-width: ${variables.d_md_max})`,
  b_lg_max: `(max-width: ${variables.d_lg_max})`,
});
