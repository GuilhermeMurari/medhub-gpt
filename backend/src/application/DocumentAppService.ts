import { DocumentService } from '../domain/DocumentService';

export class DocumentAppService {
  private service = new DocumentService();

  create(data: Parameters<DocumentService['create']>[0]) {
    return this.service.create(data);
  }

  approve(id: string, payload: { expiryDate?: Date }) {
    return this.service.approve(id, payload);
  }

  reject(id: string, reason: string) {
    return this.service.reject(id, reason);
  }
}
