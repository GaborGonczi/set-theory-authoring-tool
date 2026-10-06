export class Expression {
  private id: number;
  private file_id: number;
  private variable_id: number;
  private statement: string;
  private result: string;
  private start: number;
  private end: number;
  private noparse: boolean;
  private row: number;
  private created_at: Date;
  private updated_at: Date;
  private deleted_at: Date;

  constructor(expression: {
    id: number;
    file_id: number;
    variable_id: number;
    statement: string;
    result: string;
    start: number;
    end: number;
    noparse: boolean;
    row: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }) {
    this.id = expression.id;
    this.file_id = expression.file_id;
    this.variable_id = expression.variable_id;
    this.statement = expression.statement;
    this.result = expression.result;
    this.start = expression.start;
    this.end = expression.end;
    this.noparse = expression.noparse;
    this.row = expression.row;
    this.created_at = expression.created_at;
    this.updated_at = expression.updated_at;
    this.deleted_at = expression.deleted_at;
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

  public getVariableId(): number {
    return this.variable_id;
  }

  public setVariableId(variable_id: number): void {
    this.variable_id = variable_id;
  }

  public getStatement(): string {
    return this.statement;
  }

  public setStatement(statement: string): void {
    this.statement = statement;
  }

  public getResult(): string {
    return this.result;
  }

  public setResult(result: string): void {
    this.result = result;
  }

  public getStart(): number {
    return this.start;
  }

  public setStart(start: number): void {
    this.start = start;
  }

  public getEnd(): number {
    return this.end;
  }

  public setEnd(end: number): void {
    this.end = end;
  }

  public isNoparse(): boolean {
    return this.noparse;
  }

  public setNoparse(noparse: boolean): void {
    this.noparse = noparse;
  }

  public getRow(): number {
    return this.row;
  }

  public setRow(row: number): void {
    this.row = row;
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
