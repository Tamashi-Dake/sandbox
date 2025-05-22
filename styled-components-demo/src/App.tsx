import AntdTabs from "./components/common/Tabs";
import { GlobalStyle } from "./components/styled/GlobalStyles";
import StyledButton from "./components/styled/StyledButton";
import Theme from "./theme";

function App() {
  return (
    <Theme>
      <div className="">
        <GlobalStyle />
        <StyledButton $background="red" $color="">
          <p>Click me</p>
        </StyledButton>
      </div>
      <AntdTabs />
    </Theme>
  );
}

export default App;
