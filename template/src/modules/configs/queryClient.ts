import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

export default queryClient;
