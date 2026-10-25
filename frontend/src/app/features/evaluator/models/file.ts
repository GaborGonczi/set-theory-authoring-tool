import { Expression } from '@src/app/features/evaluator/models/expression';
import { Variable } from '@src/app/features/evaluator/models/variable';

export class File {
  private id: number;
  private user_id: number;
  private example: boolean;
  private created_at: Date;
  private updated_at: Date;
  private deleted_at: Date;

  private expressions: Expression[] = [];
  private variables: Variable[] = [];

  constructor(file: {
    id: number;
    user_id: number;
    example: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    expressions?: ConstructorParameters<typeof Expression>[0][];
    variables?: ConstructorParameters<typeof Variable>[0][];
  }) {
    this.id = file.id;
    this.user_id = file.user_id;
    this.example = file.example;
    this.created_at = file.created_at;
    this.updated_at = file.updated_at;
    this.deleted_at = file.deleted_at;
    if (file.expressions) {
      file.expressions.forEach((expression) => {
        this.expressions.push(new Expression(expression));
      });
    }
    if (file.variables) {
      file.variables.forEach((variable) => {
        this.variables.push(new Variable(variable));
      });
    }
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getUserId(): number {
    return this.user_id;
  }

  public setUserId(user_id: number): void {
    this.user_id = user_id;
  }

  public isExample(): boolean {
    return this.example;
  }

  public setExample(example: boolean): void {
    this.example = example;
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

  public getExpressions(): Expression[] {
    return this.expressions;
  }

  public setExpressions(expressions: Expression[]): void {
    this.expressions = expressions;
  }

  public getVariables(): Variable[] {
    return this.variables;
  }

  public setVariables(variables: Variable[]): void {
    this.variables = variables;
  }
}
