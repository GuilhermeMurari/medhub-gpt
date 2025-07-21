import { AuthService } from '../domain/AuthService';

export class AuthAppService {
  private auth = new AuthService();

  login(email: string, password: string) {
    return this.auth.login(email, password);
  }
}
