// import { useQuery, UseQueryOptions } from '@tanstack/react-query';

// interface UseQueryParams<T> {
//   queryKey: string | unknown[];
//   queryFn: () => Promise<T>;
//   options?: Omit<UseQueryOptions<T, unknown, T, unknown>, 'queryKey' | 'queryFn'>;
// }

// export const useQueryData = <T,>({
//   queryKey,
//   queryFn,
//   options,
// }: UseQueryParams<T>) => {
//   const query = useQuery<T, unknown>({
//     queryKey,
//     queryFn,
//     ...options,
//   });

//   return {
//     ...query,
//     refetch: query.refetch,
//     invalidate: query.invalidateQueries,
//   };
// };