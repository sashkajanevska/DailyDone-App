import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import AppContent from "./AppContent";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
