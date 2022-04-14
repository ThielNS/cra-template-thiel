import { QueryClientProvider } from 'react-query';
import axiosInstance from 'modules/configs/axiosInstance';
import queryClient from 'modules/configs/queryClient';
import { AxiosProvider } from 'modules/contexts';
import Routing from 'modules/routing';

function App() {
  return (
    <AxiosProvider axiosInstance={axiosInstance}>
      <QueryClientProvider client={queryClient}>
        <Routing />
      </QueryClientProvider>
    </AxiosProvider>
  );
}

export default App;
