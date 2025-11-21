import { useDispatch, useSelector } from 'react-redux';

// Export pre-typed hooks for easier usage
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Custom hooks for specific slices
export const useAuth = () => {
  return useAppSelector((state) => state.auth);
};

export const useTasks = () => {
  return useAppSelector((state) => state.tasks);
};

export const useMeetings = () => {
  return useAppSelector((state) => state.meetings);
};
