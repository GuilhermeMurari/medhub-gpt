import { AppDataSource } from '../config/data-source';
import { Document } from '../entities/Document';
import crypto from 'crypto';

export class DocumentService {
  private repo = AppDataSource.getRepository(Document);

  async create(data: Partial<Document>) {
    const doc = this.repo.create({ ...data, id: crypto.randomUUID() });
    return this.repo.save(doc);
  }

  async approve(id: string, { expiryDate }: { expiryDate?: Date } = {}) {
    const doc = await this.repo.findOne({ where: { id } });
    if (!doc) return null;
    doc.status = 'approved';
    if (expiryDate) doc.expiryDate = expiryDate;
    doc.approvedAt = new Date();
    return this.repo.save(doc);
  }

  async reject(id: string, reason: string) {
    const doc = await this.repo.findOne({ where: { id } });
    if (!doc) return null;
    doc.status = 'rejected';
    doc.rejectionReason = reason;
    doc.rejectedAt = new Date();
    return this.repo.save(doc);
  }
}
