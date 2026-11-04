import { signup } from '@/api/auth';
import { useAuthMutation } from './useAuthMutation';

export function useSignup(onError) {
  return useAuthMutation(signup, onError);
}
