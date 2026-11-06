import { login } from '@/api/auth';
import { useAuthMutation } from './useAuthMutation';

export function useLogin(onError) {
  return useAuthMutation(login, onError);
}
