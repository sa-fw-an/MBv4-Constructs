import { TNodeType, TUnaryOperator, TBinaryOperator } from "./types/types";

// Base AST node
export abstract class ASTNodeBase {
  constructor(protected readonly _type: TNodeType) {}
  public get type(): TNodeType {
    return this._type;
  }
}

// Program
export abstract class Program extends ASTNodeBase {
  constructor(protected readonly _body: ASTNodeBase[]) {
    super("Program");
  }
  public get body(): ASTNodeBase[] {
    return this._body;
  }
}

// Function Declarations
export abstract class FunctionDeclaration extends ASTNodeBase {
  constructor(
    nodeType: TNodeType,
    protected readonly _body: ASTNodeBase,
  ) {
    super(nodeType);
  }
  public get body(): ASTNodeBase {
    return this._body;
  }
}

// Block
export abstract class Block extends ASTNodeBase {
  constructor(protected readonly _statements: ASTNodeBase[]) {
    super("Block");
  }
  public get statements(): ASTNodeBase[] {
    return this._statements;
  }
}

// Statements
export abstract class Statement extends ASTNodeBase {}

export abstract class SimpleStatement extends Statement {}

export abstract class CompoundStatement extends Statement {
  constructor(
    nodeType: TNodeType,
    protected readonly _body: ASTNodeBase,
  ) {
    super(nodeType);
  }
  public get body(): ASTNodeBase {
    return this._body;
  }
}

// Expressions
export abstract class Expression extends ASTNodeBase {}

export abstract class LiteralExpression extends Expression {
  constructor(
    nodeType: TNodeType,
    protected readonly _value: number | string | boolean,
  ) {
    super(nodeType);
  }
  public get value(): number | string | boolean {
    return this._value;
  }
}

export abstract class UnaryOperatorExpression extends Expression {
  constructor(
    nodeType: TNodeType,
    protected readonly _operator: TUnaryOperator,
    protected readonly _operand: Expression,
  ) {
    super(nodeType);
  }
  public get operator(): TUnaryOperator {
    return this._operator;
  }
  public get operand(): Expression {
    return this._operand;
  }
}

export abstract class BinaryOperatorExpression extends Expression {
  constructor(
    nodeType: TNodeType,
    protected readonly _operator: TBinaryOperator,
    protected readonly _left: Expression,
    protected readonly _right: Expression,
  ) {
    super(nodeType);
  }
  public get operator(): TBinaryOperator {
    return this._operator;
  }
  public get left(): Expression {
    return this._left;
  }
  public get right(): Expression {
    return this._right;
  }
}

export abstract class FunctionCallExpression extends Expression {
  constructor(
    protected readonly _callee: Expression,
    protected readonly _args: {
      param: Expression;
      value: Expression;
    }[],
  ) {
    super("FunctionCallExpression");
  }
  public get callee(): Expression {
    return this._callee;
  }
  public get args(): { param: Expression; value: Expression }[] {
    return this._args;
  }
}

export abstract class MemberExpression extends Expression {
  constructor(
    protected readonly _object: Expression,
    protected readonly _property: Expression,
  ) {
    super("MemberExpression");
  }
  public get object(): Expression {
    return this._object;
  }
  public get property(): Expression {
    return this._property;
  }
}

export abstract class ArrayExpression extends Expression {
  constructor(protected readonly _elements: Expression[]) {
    super("ArrayExpression");
  }
  public get elements(): Expression[] {
    return this._elements;
  }
}

export abstract class DictExpression extends Expression {
  constructor(
    protected readonly _entries: {
      key: Expression;
      value: Expression;
    }[],
  ) {
    super("DictExpression");
  }
  public get entries(): { key: Expression; value: Expression }[] {
    return this._entries;
  }
}

export abstract class IdentifierExpression extends Expression {
  constructor(protected readonly _name: string) {
    super("IdentifierExpression");
  }
  public get name(): string {
    return this._name;
  }
}