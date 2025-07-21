import { AppDataSource } from '../config/data-source';
import { Clinic } from '../entities/Clinic';

export class ClinicAppService {
  private repo = AppDataSource.getRepository(Clinic);

  create(data: Partial<Clinic>) {
    const clinic = this.repo.create(data);
    return this.repo.save(clinic);
  }

  list() {
    return this.repo.find();
  }
}
