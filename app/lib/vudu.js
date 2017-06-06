import v from 'npm:vudu';

export const vars = {
  navBarHeight: 110,
  pageTransitionDuration: 650,
};

export const breakpoints = {
  sm: '@media (min-width: 40em)',
  md: '@media (min-width: 52em)',
  lg: '@media (min-width: 64em)',
  xl: '@media (min-width: 76em)',
  xx: '@media (min-width: 88em)',
};

const colors = {
  white: '#ffffff',
  black: '#000000',
  lightGray: '#FAFAFA',
};

const c = v.config({ colors });
// LAYOUT

const numbers = [0, 50, 100];

numbers.forEach((n) => {
  c[`maxHeight${n}`] = { maxHeight: `${n}px` };
  c[`minHeight${n}`] = { minHeight: `${n}px` };
  c[`maxWidth${n}`] = { maxWidth: `${n}px` };
  c[`minWidth${n}`] = { minWidth: `${n}px` };
  c[`t${n}`] = { top: `${n}px` };
  c[`r${n}`] = { right: `${n}px` };
  c[`b${n}`] = { bottom: `${n}px` };
  c[`l${n}`] = { left: `${n}px` };
});

c.opac1 = {
  opacity: 1,
}

c.opac0 = {
  opacity: 0,
}

c.mdFlex = {
  display: 'initial',
};

c.mdFlex[breakpoints.md] = {
  display: 'flex',
};

c.pre = {
  whiteSpace: 'pre',
};

c.flex = {
  display: 'flex',
};

c.flexOne = {
  flex: 1,
};

c.flexHalf = {
  flex: 0.5,
};

c.flexColumn = {
  flexDirection: 'column',
};

c.flexRow = {
  flexDirection: 'row',
};

c.spaceBetween = {
  justifyContent: 'space-between',
};

c.spaceAround = {
  justifyContent: 'space-around',
};

c.justifyCenter = {
  justifyContent: 'center',
};

c.justifyEnd = {
  justifyContent: 'flex-end',
};

c.alignEnd = {
  alignItems: 'flex-end',
};

c.alignCenter = {
  alignItems: 'flex-center',
};

c.selfStart = {
  alignSelf: 'flex-start',
};

c.selfCenter = {
  alignSelf: 'center',
};

c.selfEnd = {
  alignSelf: 'flex-end',
};

c.selfBaseline = {
  alignSelf: 'baseline',
};

c.wrap = {
  flexWrap: 'wrap',
};

c.fullHeight = {
  height: '100%',
};

c.fullWidth = {
  width: '100%',
};

c.listNone = {
  listStyle: 'none',
};

// RESPONSIVE
c.smHide = {
  display: 'none',
};
c.smHide[breakpoints.sm] = {
  display: 'inherit',
};
c.smShow = {
  display: 'inherit',
};
c.smShow[breakpoints.sm] = {
  display: 'none',
};

c.mirror = {
  transform: 'rotate(180deg)',
};

c.smFullWidth = {
  width: '100%',
};

c.smFullWidth[breakpoints.sm] = {
  width: 'auto',
};

// TYPE
c.sansRegular = {
  fontFamily: 'AtlasGroteskLight',
  fontWeight: 300,
};

c.sansLight = {
  fontFamily: 'AtlasGroteskLight',
  fontWeight: 300,
};

c.serifRegular = {
  fontFamily: 'Austin News Deck',
  fontWeight: 'normal',
};

c.serifLight = {
  fontFamily: 'Austin News Deck',
  fontWeight: 300,
};

c.decorationNone = {
  textDecoration: 'none',
};

// GLOBAL
c.liquidInner = {
  position: 'absolute',
  backgroundColor: colors.lightGray,
  bottom: 0,
  width: '100%',
  height: `calc(100% - ${vars.navBarHeight}px)`,
  overflow: 'scroll',
  '-webkit-overflow-scrolling': 'touch',
};

c.footerHeight = {
  height: '250px'
};

export default c;
