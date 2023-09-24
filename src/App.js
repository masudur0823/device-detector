import { QueryClient, QueryClientProvider } from "react-query";
import DetectDevice from "./components/DetectDevice";
import Login from "./page/auth/Login";
import Home from "./page/Home";
import { Route, Routes } from "react-router-dom";

import Example from "./page/Example";

function App() {
  const queryClient = new QueryClient();
  const token = localStorage.getItem("accessToken");
  let data = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <BasicTable /> */}
        <Routes>
          <Route path="login" element={<Login />} />

          <Route path="/" element={<Home />} />
          <Route path="detectDevice" element={<DetectDevice />} />
          <Route path="task" element={<Example/>} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
