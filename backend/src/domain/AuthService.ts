import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match || !user.isActive) return null;

    const expiresIn = 3600; // 1h
    const token = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn }
    );
    user.lastLogin = new Date();
    await this.userRepo.save(user);
    return { user, token, expiresIn };
  }
}
