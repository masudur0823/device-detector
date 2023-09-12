import { QueryClient, QueryClientProvider } from "react-query";
// import BasicTable from "./components/BasicTable";
import DetectDevice from "./components/DetectDevice";
import Login from "./page/auth/Login";
import Home from "./page/Home";

function App() {
  const queryClient = new QueryClient();
  const token = localStorage.getItem("accessToken");
  let data = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <BasicTable /> */}

        {!token ? (
          <Login />
        ) : (
          <>
            {data.email === "masudur0823@gmail.com" ? (
              <DetectDevice />
            ) : (
              <Home />
            )}
          </>
        )}
      </QueryClientProvider>
    </>
  );
}

export default App;
