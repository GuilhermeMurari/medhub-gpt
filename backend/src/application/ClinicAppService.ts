import { AppDataSource } from '../config/data-source';
import { Clinic } from '../entities/Clinic';
import { supabase } from '../supabase';

export class ClinicAppService {
  private repo = AppDataSource.getRepository(Clinic);

  async create(data: Partial<Clinic>) {
    const clinic = this.repo.create(data);
    const saved = await this.repo.save(clinic);
    if (supabase) {
      try {
        await supabase.from('clinics').insert([{ ...saved }]);
      } catch (err) {
        console.error('supabase insert clinic failed', err);
      }
    }
    return saved;
  }

  list() {
    return this.repo.find();
  }
}
