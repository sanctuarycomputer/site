import v from 'npm:vudu';

export const vars = {
  navBarHeight: 110,
  pageTransitionDuration: 650
};

export const breakpoints = {
  sm: '@media (min-width: 40em)',
  md: '@media (min-width: 52em)',
  lg: '@media (min-width: 64em)',
  xl: '@media (min-width: 76em)',
  xx: '@media (min-width: 88em)'
};

const colors = {
  white: '#ffffff',
  black: '#000000',
};

const c = v.config({ colors });

c.fullHeight = {
  height: '100%'
};

c.smHide = {
  display: 'none',
};
c.smHide[breakpoints.sm] = {
  display: 'inherit'
};
c.smShow = {
  display: 'inherit',
};
c.smShow[breakpoints.sm] = {
  display: 'none'
};

c.mirror = {
  transform: 'rotate(180deg)'
};

c.liquidInner = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: `calc(100% - ${vars.navBarHeight}px)`,
  overflow: 'scroll',
  '-webkit-overflow-scrolling': 'touch'
};

export default c;
