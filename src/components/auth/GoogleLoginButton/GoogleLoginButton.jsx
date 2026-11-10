import { API_BASE_URL } from '@/constants';

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    const next = encodeURIComponent('/challenges');
    window.location.assign(`${API_BASE_URL}/auth/google?next=${next}`);
  };

  return <button onClick={handleGoogleLogin}>구글로 시작하기</button>;
}
