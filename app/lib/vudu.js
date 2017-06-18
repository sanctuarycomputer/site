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
  sanctuBlue: '#0000FF',
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

c.justifyStart = {
  justifyContent: 'flex-start'
}

c.justifyEnd = {
  justifyContent: 'flex-end',
};

c.alignEnd = {
  alignItems: 'flex-end',
};

c.alignCenter = {
  alignItems: 'center'
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

c.p = {
  fontSize: '1.125em',
  lineHeight: '1.222em',
  fontFamily: 'Austin News Deck',
  fontWeight: 300,
}

c.p[breakpoints.md] = {
  fontSize: '2.125em',
  lineHeight: '1.117em',
};

c.p[breakpoints.lg] = {
  fontSize: '2.25em',
  lineHeight: '1.111em',
};

c.p[breakpoints.xl] = {
  fontSize: '3.45em',
  lineHeight: '1.085em',
};

c.p[breakpoints.xx] = {
  fontSize: '4.25em',
  lineHeight: '1em',
};

c.pSmall = {
  fontSize: '1em',
  lineHeight: '1.25em',
  fontFamily: 'AtlasGroteskLight',
  fontWeight: 300,
};

c.navLink = {
  fontSize: '3em',
  lineHeight: '1em',
  fontFamily: 'Austin News Deck',
  fontWeight: 'normal',
};

c.navLink[breakpoints.sm] = {
  fontSize: '2em',
  lineHeight: '1em',
};

c.navLink[breakpoints.md] = {
  fontSize: '2.25em',
  lineHeight: '1em',
};

c.navLink[breakpoints.md] = {
  fontSize: '3.125em',
  lineHeight: '1em',
};

c.title = {
  fontSize: '1.125em',
  lineHeight: '1.222em',
  fontFamily: 'Austin News Deck',
  fontWeight: 'normal',
};

c.title[breakpoints.md] = {
  fontSize: '2.125em',
  lineHeight: '1em',
};

c.title[breakpoints.xl] = {
  fontSize: '2.25em',
  lineHeight: '1em',
};

// WHITESPACE
c.spacer = {
  paddingTop: '0.5rem',
  marginBottom: '0.5rem',
};

c.spacer[breakpoints.md] = {
  paddingTop: '0.75rem',
  paddingBottom: '0.75rem',
};

c.spacer[breakpoints.lg] = {
  paddingTop: '1rem',
  paddingBottom: '1rem',
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

c.borderTopThin = {
  borderTop: `solid 1px ${colors.black}`,
};

c.borderBottomThin = {
  borderBottom: `solid 1px ${colors.black}`,
};

c.pointer = {
  cursor: 'pointer',
};

export default c;
