import { useEffect } from 'react';
import { AuthStore } from '@/store/AuthStore';
import { UserStore } from '@/store/UserStore';
import { getUser } from '@/api/user/getUser.ts';

export function useFetchUser(token: string | null) {
  const logout = AuthStore((s) => s.logout);
  const setUser = UserStore((s) => s.setUser);

  useEffect(() => {
    if (!token) return;
    getUser()
      .then((user) => setUser({ firstName: user.first_name, lastName: user.last_name }))
      .catch(logout);
  }, [token, logout, setUser]);
}
