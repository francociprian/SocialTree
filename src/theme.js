import { extendTheme } from "@chakra-ui/react"

const theme = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  colors: {
    bg: {
      light: "#FFFFFF",
      // dark: "#13111C",
      // dark: "#234577",
      dark: "#1A202C",
    },
    light: {
      white: "#FFFFFF",
      dark: "#12101C",
    },
    link: {
      light: "#E6FFFA",
      dark: "#285E61",
    }
  },
  style: {
    global: {
      body: {
        margin: 0,
        'font-family': "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
      }, 
        
      code: {
          'font-family': "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
      },
    },
  },
};

export default extendTheme(theme)