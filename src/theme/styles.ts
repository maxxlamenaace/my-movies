export const globalStyles = {
  verticalGradientBackgroundImage: {
    dark: {
      backgroundImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
    },
    light: {
      backgroundImage: 'linear-gradient(to top, rgba(245,245,245,1), rgba(0,0,0,0))',
    },
  },
  horizontalGradientBackgroundImage: {
    dark: {
      backgroundImage: 'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))',
    },
    light: {
      backgroundImage: 'linear-gradient(to right, rgba(245,245,245,1), rgba(0,0,0,0))',
    },
  },
  paragraph: (lines: number, textAlign?: string | object) => ({
    textAlign: textAlign || 'justify',
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
  }),
  container: {
    maxWidth: '1366px',
    margin: 'auto',
    padding: 2,
  },
  backgroundImage: (imgPath: string) => ({
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'darkgrey',
    backgroundImage: `url(${imgPath})`,
  }),
};
