import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { UserService } from '../services/user-service';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(UserService);
  const router = inject(Router);

  if(auth.isAuthenticated()){
    router.navigate(['/user/home']);
    return false;
  }

  return true;
};
