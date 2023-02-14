import * as React from 'react';

let list = ['1', '23', '456', '78910'];

interface IAppProps {
  fetchData?: () => [DataState, React.Dispatch<Action>] | boolean;
}

interface DataState {
  data: number[];
  isLoading: boolean;
  error: Error | null;
}

type Action =
  | { type: 'FETCH_SUCCESS'; payload: number[] }
  | { type: 'FETCH_ERROR'; payload: Error };

// This is the reducer function that updates the state based on the action type
const dataFetchingReducer = (state: DataState, action: Action): DataState => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      // When the fetch is successful, update the data, set isLoading to false, and clear the error
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      };
    case 'FETCH_ERROR':
      // When the fetch encounters an error, clear the data, set isLoading to false, and set the error
      return {
        ...state,
        data: [],
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// The custom hook that fetches data and returns the current state and dispatch function
export function useFetchData(
  data: string[]
): [DataState, React.Dispatch<Action>] {
  const [state, dispatch] = React.useReducer(dataFetchingReducer, {
    data: [],
    error: null,
    isLoading: true,
  });

  async function fetchData() {
    try {
      // Replace this with a real API call
      const result = await Promise.resolve(data.map(Number));
      dispatch({ type: 'FETCH_SUCCESS', payload: result });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error });
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [state]);

  return [state, dispatch];
}

// The main component that uses the custom hook and displays the data
export default function App() {
  const [{ data, isLoading, error }] = useFetchData(list);

  if (error) {
    // Display an error message if there was an error fetching the data
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    // Display a loading indicator if the data is still being fetched
    return <div>Loading...</div>;
  }

  // Display the data if it was successfully fetched
  return data.map((value, index) => <div key={index}>{value}</div>);
}
