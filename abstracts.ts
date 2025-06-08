import { TNodeType, TUnaryOperator, TBinaryOperator } from "./types/types";

//Base AST node
export abstract class ASTNodeBase {
  constructor(protected readonly _type: TNodeType) {}
  public get type(): TNodeType {
    return this._type;
  }
}

// Program
export abstract class Programextends ASTNodeBase {
  constructor(protected readonly _body: ASTNodeBase[]) {
    super("Program");
  }
  public get body(): ASTNodeBase[] {
    return this._body;
  }
}

// Function Declarations
export abstract class FunctionDeclarationextends ASTNodeBase {
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
export abstract class Blockextends ASTNodeBase {
  constructor(protected readonly _statements: ASTNodeBase[]) {
    super("Block");
  }
  public get statements(): ASTNodeBase[] {
    return this._statements;
  }
}

// Statements
export abstract class Statementextends ASTNodeBase {}

export abstract class SimpleStatementextends Statement{}

export abstract class CompoundStatementextends Statement{
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
export abstract class Expressionextends ASTNodeBase {}

export abstract class LiteralExpressionextends Expression{
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

export abstract class UnaryOperatorExpressionextends Expression{
  constructor(
    nodeType: TNodeType,
    protected readonly _operator: TUnaryOperator,
    protected readonly _operand: Expression
  ) {
    super(nodeType);
  }
  public get operator(): TUnaryOperator {
    return this._operator;
  }
  public get operand(): Expression{
    return this._operand;
  }
}

export abstract class BinaryOperatorExpressionextends Expression{
  constructor(
    nodeType: TNodeType,
    protected readonly _operator: TBinaryOperator,
    protected readonly _left: Expression
    protected readonly _right: Expression
  ) {
    super(nodeType);
  }
  public get operator(): TBinaryOperator {
    return this._operator;
  }
  public get left(): Expression{
    return this._left;
  }
  public get right(): Expression{
    return this._right;
  }
}

export abstract class FunctionCallExpressionextends Expression{
  constructor(
    protected readonly _callee: Expression
    protected readonly _args: {
      param: Expression
      value: Expression
    }[],
  ) {
    super("FunctionCallExpression");
  }
  public get callee(): Expression{
    return this._callee;
  }
  public get args(): { param: Expression value: Expression}[] {
    return this._args;
  }
}

export abstract class MemberExpressionextends Expression{
  constructor(
    protected readonly _object: Expression
    protected readonly _property: Expression
  ) {
    super("MemberExpression");
  }
  public get object(): Expression{
    return this._object;
  }
  public get property(): Expression{
    return this._property;
  }
}

export abstract class ArrayExpressionextends Expression{
  constructor(protected readonly _elements: Expression]) {
    super("ArrayExpression");
  }
  public get elements(): Expression] {
    return this._elements;
  }
}

export abstract class DictExpressionextends Expression{
  constructor(
    protected readonly _entries: {
      key: Expression
      value: Expression
    }[],
  ) {
    super("DictExpression");
  }
  public get entries(): { key: Expression value: Expression}[] {
    return this._entries;
  }
}

export abstract class IdentifierExpressionextends Expression{
  constructor(protected readonly _name: string) {
    super("IdentifierExpression");
  }
  public get name(): string {
    return this._name;
  }
}
