import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import type { DefaultTheme } from "styled-components";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      darkerBg: string;
      red: string;
    };
  }
}
const coolTheme: DefaultTheme = {
  colors: {
    darkerBg: "#222",
    red: "#ff0000",
  },
};

export default function Theme({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={coolTheme}>{children}</ThemeProvider>;
}
