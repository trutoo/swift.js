module.exports = (variables) => ({
  headline: (mixin) => {
    return {
      'font-weight': 'bolder',
    };
  },

  text: (mxin) => {
    return {
      'font-weight': 400,
      'font-family': variables.f_stack,
    };
  },

  iconBase: (mixin) => {
    return {
      'line-height': 1,
      'font-weight': 'normal',
      'font-style': 'normal',
      'font-variant': 'normal',

      /* use !important to prevent issues with browser extensions that change fonts */

      'font-family': `${variables.f_stack_icons}, ${variables.f_stack} !important`,
      'text-transform': 'none',

      /* Better Font Rendering =========== */

      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      'speak': 'none',
    };
  },

  /* GENERATORS */

  genIcons: (mixin) => {
    const icons = Object.keys(variables).filter((key) => key.startsWith('i'));
    const generated = {};
    icons.forEach((icon) => {
      let className = icon.replace('i_', '.icon-').replace('_', '-');
      generated[`${className}::before`] = {
        'content': variables[icon],
      };
    });
    return generated;
  },

  /* CLEARFIX */

  clearfocus: (mixin) => {
    return {
      '&:focus': {
        'color': 'inherit',
        'background-color': 'transparent',
      },
    };
  },

  /* CLEARFIX */

  clearfix: (mixin) => {
    return {
      '&::after': {
        'display': 'block',
        'content': '""',
        'clear': 'both',
      },
    };
  },

  /* FONT SCALING */

  fontScaling: (mixin, minimum, maximum) => {
    const maxUnit = parseInt(maximum, 10);
    const widthUnit = parseInt(variables.d_xl, 10);
    return {
      'font-size': `calc(100vw * ${maxUnit * 10 / widthUnit})`,

      '@media (--b_xs)': {
        'font-size': minimum,
      },

      '@media (--b_xl)': {
        'font-size': maximum,
      },
    };
  },

  /* GRID COLUMNS */

  columns: (mixin, device) => {
    const columns = {};
    for (let i = 1; i <= variables.d_columns; i++) {
      columns[`&[columns${device ? '-' + device : ''}="${i}"] > *`] = {
        'width': `calc(${100 / i}% - ${variables.d_columns_gap} - 0.01rem)`,

        '&.c-grid': {
          'width': `calc(${100 / i}% - 0.01rem)`,
        },
      };
    };
    return columns;
  },

  colspan: (mixin, count) => {
    return {
      'width': `calc(${100 / variables.d_columns}% * ${count} - ${variables.d_columns_gap} - 0.01rem) !important`,
      'flex-grow': '0 !important',
    };
  },
});
