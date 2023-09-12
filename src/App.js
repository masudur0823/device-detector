import { QueryClient, QueryClientProvider } from "react-query";
// import BasicTable from "./components/BasicTable";
import DetectDevice from "./components/DetectDevice";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <BasicTable /> */}
        <DetectDevice />
      </QueryClientProvider>
    </>
  );
}

export default App;
