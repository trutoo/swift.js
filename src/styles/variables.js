module.exports = {

  /* COLOR */
  c_color_alpha: '#063a54',
  c_color_beta: '#7028b7',
  c_color_gamma: '#00c8c8',
  c_light_alpha: '#f5f2f0',
  c_light_beta: '#e5e5e5',
  c_light_gamma: '#ccc',
  c_code: '#404040',
  c_valid: '#95c11f',
  c_warning: '#ea5b0c',
  c_invalid: '#c43b0a',

  /* Z-INDEX */
  z_floating: 1000,
  z_context_menu: 1900,
  z_popup: 2000,

  /* FONT STACK */
  f_stack: 'sans-serif',
  f_stack_icons: 'sans-serif',

  /* TIMINGS */
  t_animation: '200ms',

  /* DIMENSIONS */
  d_fs: '16px',
  d_lh: '24px', /* Sync value with postcss-lh (lineHeight * 10) in config */

  /* Grid */
  d_columns: 12,
  d_columns_gap: '1vr', /* vr = Vertical Rhythm, a unit based on d_lh */

  /* Devices */
  d_xs: '543px',
  d_sm: '544px',
  d_md: '768px',
  d_lg: '992px',
  d_xl: '1200px',
  d_sm_max: '767px', /* One less than counter part */
  d_md_max: '991px', /* One less than counter part */
  d_lg_max: '1199px', /* One less than counter part */

  /* ICONS */
  i_info: '"?"',
  i_warning: '"!"',
  i_prev: '"<"',
  i_next: '">"',
  i_close: '"x"',
  i_expand: '"+"',
  i_collapse: '"-"',
  i_list_item: '">"',
  i_ascending: '"\\25B2"',
  i_descending: '"\\25BC"',
  i_menu: '"\\22EF"',
  i_checkbox: '"\\2610"',
  i_checkbox_checked: '"\\2611"',
  i_radio: '"\\25EF"',
  i_radio_checked: '"\\25C9"',
};
