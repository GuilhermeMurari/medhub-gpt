import { AppDataSource } from '../config/data-source';
import { Document } from '../entities/Document';
import crypto from 'crypto';
import { supabase } from '../supabase';

export class DocumentService {
  private repo = AppDataSource.getRepository(Document);

  async create(data: Partial<Document>) {
    const doc = this.repo.create({ ...data, id: crypto.randomUUID() });
    const saved = await this.repo.save(doc);
    if (supabase) {
      try {
        await supabase.from('documents').insert([{ ...saved }]);
      } catch (err) {
        console.error('supabase insert document failed', err);
      }
    }
    return saved;
  }

  async approve(id: string, { expiryDate }: { expiryDate?: Date } = {}) {
    const doc = await this.repo.findOne({ where: { id } });
    if (!doc) return null;
    doc.status = 'approved';
    if (expiryDate) doc.expiryDate = expiryDate;
    doc.approvedAt = new Date();
    const saved = await this.repo.save(doc);
    if (supabase) {
      try {
        await supabase
          .from('documents')
          .update({ status: 'approved', expiryDate: doc.expiryDate, approvedAt: doc.approvedAt })
          .eq('id', id);
      } catch (err) {
        console.error('supabase approve document failed', err);
      }
    }
    return saved;
  }

  async reject(id: string, reason: string) {
    const doc = await this.repo.findOne({ where: { id } });
    if (!doc) return null;
    doc.status = 'rejected';
    doc.rejectionReason = reason;
    doc.rejectedAt = new Date();
    const saved = await this.repo.save(doc);
    if (supabase) {
      try {
        await supabase
          .from('documents')
          .update({ status: 'rejected', rejectionReason: reason, rejectedAt: doc.rejectedAt })
          .eq('id', id);
      } catch (err) {
        console.error('supabase reject document failed', err);
      }
    }
    return saved;
  }
}
