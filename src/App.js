import { QueryClient, QueryClientProvider } from "react-query";
// import BasicTable from "./components/BasicTable";
import DetectDevice from "./components/DetectDevice";
import Login from "./page/auth/Login";
import Home from "./page/Home";

function App() {
  const queryClient = new QueryClient();
  const token = localStorage.getItem("accessToken");
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <BasicTable /> */}
        {/* <DetectDevice /> */}
        {!token ? <Login /> : <Home />}
      </QueryClientProvider>
    </>
  );
}

export default App;
