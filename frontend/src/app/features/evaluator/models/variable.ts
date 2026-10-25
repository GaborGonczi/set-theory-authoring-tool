export class Variable {
  private id: number;
  private file_id: number;
  private name: string;
  private value: string;
  private created_at: Date;
  private updated_at: Date;
  private deleted_at: Date;

  constructor(variable: {
    id: number;
    file_id: number;
    name: string;
    value: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }) {
    this.id = variable.id;
    this.file_id = variable.file_id;
    this.name = variable.name;
    this.value = variable.value;
    this.created_at = variable.created_at;
    this.updated_at = variable.updated_at;
    this.deleted_at = variable.deleted_at;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getFileId(): number {
    return this.file_id;
  }

  public setFileId(file_id: number): void {
    this.file_id = file_id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string): void {
    this.value = value;
  }

  public getCreatedAt(): Date {
    return this.created_at;
  }

  public setCreatedAt(created_at: Date): void {
    this.created_at = created_at;
  }

  public getUpdatedAt(): Date {
    return this.updated_at;
  }

  public setUpdatedAt(updated_at: Date): void {
    this.updated_at = updated_at;
  }

  public getDeletedAt(): Date {
    return this.deleted_at;
  }

  public setDeletedAt(deleted_at: Date): void {
    this.deleted_at = deleted_at;
  }
}
