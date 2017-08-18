import v from 'npm:vudu';

export const vars = {
  triangleBorderValue: 14,
  navBarFudge: 2,
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

export const colors = {
  white: '#ffffff',
  offWhite: 'rgba(255, 255, 255, 0.5)',
  outGray: 'rgba(0, 0, 0, 0.25)',
  black: '#000000',
  lightGray: '#FAFAFA',
  sanctuBlue: '#073763',
  electricBlue: '#0000FF',
  transparent: 'rgba(0,0,0,0)',
};

const c = v.config({ colors });
// LAYOUT

const numbers = [0, 10, 15, 50, 100, 200, 300, 400];

numbers.forEach((n) => {
  c[`maxHeight${n}`] = { maxHeight: `${n}px` };
  c[`minHeight${n}`] = { minHeight: `${n}px` };
  c[`maxWidth${n}`] = { maxWidth: `${n}px` };
  c[`minWidth${n}`] = { minWidth: `${n}px` };
  c[`t${n}`] = { top: `${n}px` };
  c[`r${n}`] = { right: `${n}px` };
  c[`b${n}`] = { bottom: `${n}px` };
  c[`l${n}`] = { left: `${n}px` };
  c[`z${n}`] = { zIndex: n };
});

c.opac1 = {
  opacity: 1,
};

c.opac0 = {
  opacity: 0,
};

c.absoluteCenter = {
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
};

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
};

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

c.mdTwoColumn = {
  columnCount: 1,
};

c.mdTwoColumn[breakpoints.md] = {
  columnCount: 2,
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
  fontFamily: 'AtlasGroteskRegular',
  fontWeight: 'normal',
};

c.sansLight = {
  fontFamily: 'AtlasGroteskLight',
  fontWeight: 100,
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

c.pLarge = {
  fontSize: '1.75em',
  lineHeight: '1.117em',
};

c.pLarge[breakpoints.md] = {
  fontSize: '2.125em',
  lineHeight: '1.117em',
};

c.pLarge[breakpoints.lg] = {
  fontSize: '2.25em',
  lineHeight: '1.111em',
};

c.pLarge[breakpoints.xl] = {
  fontSize: '3.45em',
  lineHeight: '1.085em',
};

c.pLarge[breakpoints.xx] = {
  fontSize: '4.25em',
  lineHeight: '1em',
};

c.p = {
  fontSize: '1.065em',
  lineHeight: '1.47em',
};

c.p[breakpoints.lg] = {
  fontSize: '1.125em',
  lineHeight: '1.47em',
};

c.pSmall = {
  fontSize: '1em',
  lineHeight: '1.25em',
};

c.navLink = {
  fontSize: '3em',
  lineHeight: '1em',
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
};

c.title[breakpoints.md] = {
  fontSize: '2.125em',
  lineHeight: '1em',
};

c.title[breakpoints.xl] = {
  fontSize: '2.25em',
  lineHeight: '1em',
};

c.subtitle = {
  fontSize: '0.95em',
  lineHeight: '1em',
};

c.subtitle[breakpoints.md] = {
  fontSize: '1.35em',
  lineHeight: '1em',
};

c.small = {
  fontSize: '0.875em',
};

// WHITESPACE
c.spacer = {
  paddingBottom: '0.5rem',
};

c.spacer[breakpoints.md] = {
  paddingBottom: '0.75rem',
};

c.spacer[breakpoints.lg] = {
  paddingBottom: '1rem',
};

c.pt2_5 = {
  '@composes': [c.pt2],
};

c.pt2_5[breakpoints.md] = {
  '@composes': [c.pt5],
};

c.py2_5 = {
  '@composes': [c.py2],
};

c.py2_5[breakpoints.md] = {
  '@composes': [c.py5],
};

// GLOBAL
c.liquidInner = {
  position: 'absolute',
  backgroundColor: 'transparent',
  bottom: 0,
  width: '100%',
  height: `calc(100% - ${vars.navBarHeight - vars.navBarFudge}px)`,
  overflow: 'scroll',
  '-webkit-overflow-scrolling': 'touch',
};

c.topLevelContent = {
  position: 'relative',
  backgroundColor: colors.lightGray,
  zIndex: 2,
};

c.cloudWindow = {
  height: `calc(100% - ${vars.navBarHeight/4}px)`,
  position: 'relative'
};

c.cloudTriangleDown = {
  borderTop: `${vars.triangleBorderValue}vw solid ${colors.lightGray}`,
  borderLeft: '50vw solid transparent',
  borderRight: '50vw solid transparent',
  width: 0,
  height: 0,
  top: 0,
  content: "",
  display: 'block',
  position: 'absolute',
  overflow: 'hidden',
  left: 0,
  right: 0,
  margin: 'auto'
};

c.cloudTriangleUp = {
  borderBottom: `${vars.triangleBorderValue}vw solid ${colors.lightGray}`,
  borderLeft: '50vw solid transparent',
  borderRight: '50vw solid transparent',
  width: 0,
  height: 0,
  bottom: 0,
  content: "",
  display: 'block',
  position: 'absolute',
  overflow: 'hidden',
  left: 0,
  right: 0,
  margin: 'auto'
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

c.pointerNone = {
  pointerEvents: 'none',
};

c.pointerAuto = {
  pointerEvents: 'auto',
};

c.fullHeightSubNav = {
  height: `calc(100vh - ${vars.navBarHeight}px)`,
};

c.linkStyle = {
  color: colors.electricBlue,
  transition: 'opacity 200ms ease-in-out',
  ':hover': {
    opacity: '0.8',
  }
};

c.capitalize = {
  textTransform: 'capitalize',
};

c.borderNone = {
  border: 'none',
};

c.rotateNeg90 = {
  transform: 'rotate(-90deg)'
};

//Responsive Table
c.mdTable = {
  display: 'block',
  [breakpoints.md]: {
    '@composes': [c.table],
  },
};

c.mdTableRow = {
  display: 'block',
  [breakpoints.md]: {
    '@composes': [c.tableRow],
  },
};

c.mdTableCell = {
  display: 'block',
  [breakpoints.md]: {
    '@composes': [c.tableCell],
  },
};

//Cloud Overlay content
c.cloudContentTop = {
    width: '100%',
    position: 'absolute',
    left: '50%',
    top: '30%',
    transform: 'translate(-50%)',
    color: 'white',
  };

  c.cloudContentBottom = {
    width: '100%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%)',
    color: 'white',
  };


export default c;
