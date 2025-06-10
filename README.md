# Info

### 1. Types

* **`TNodeType`**

* **`TUnaryOperator`**

* **`TBinaryOperator`**

---



### Abstract base-classes (all in `abstracts.ts`)

1. **ASTNode**

   * Root of every node, holds the `type` tag.

2. **ProgramBase**

   * Defines the `body: ASTNode[]`

3. **FunctionDeclarationBase**

   * Defines the `body: ASTNode`

4. **BlockBase**

   * Defines the `statements: ASTNode[]`

5. **StatementBase**

   * Marker for all statements.

6. **SimpleStatementBase**

   * Base for leaf statements.

7. **CompoundStatementBase**

   * Base for statements with a nested block (`body`).

8. **ExpressionBase**

   * Marker for all expressions.

9. **LiteralExpressionBase**

   * Base for fixed‐value nodes (`value`).

10. **UnaryOperatorExpressionBase**

    * Base for one‐operand operator nodes (`operator`, `operand`).

11. **BinaryOperatorExpressionBase**

    * Base for two‐operand operator nodes (`operator`, `left`, `right`).

12. **FunctionCallExpressionBase**

    * Base for call‐expressions (`callee`, `args`).

13. **MemberExpressionBase**

    * Base for member lookups (`object`, `property`).

14. **ArrayExpressionBase**

    * Base for array literals (`elements[]`).

15. **DictExpressionBase**

    * Base for dictionary literals (`entries[]`).

16. **IdentifierExpressionBase**

    * Base for identifiers (`name`).

---

### Concrete subclasses

#### Program & functions

* **ProgramDeclaration** extends ProgramBase
* **ThreadFunctionDeclaration** extends FunctionDeclarationBase
* **CustomFunctionDeclaration** extends FunctionDeclarationBase

#### Blocks

* **Block** extends BlockBase

#### Simple statements

* **VariableDeclarationStatement** extends SimpleStatementBase
* **VariableAssignmentStatement** extends SimpleStatementBase
* **FunctionCallStatement** extends SimpleStatementBase
* **JumpStatement** extends SimpleStatementBase

#### Compound statements

* **ModifyingContextStatement** extends CompoundStatementBase
* **DeclarativeContextStatement** extends CompoundStatementBase
* **BranchStatement** extends CompoundStatementBase
* **MatchStatement** extends CompoundStatementBase
* **IterationLoopStatement** extends CompoundStatementBase
* **ConditionLoopStatement** extends CompoundStatementBase
* **SequenceAlterStatement** extends CompoundStatementBase

#### Literal expressions

* **NumericLiteralExpression** extends LiteralExpressionBase
* **StringLiteralExpression** extends LiteralExpressionBase
* **BooleanLiteralExpression** extends LiteralExpressionBase

#### Operator expressions

* **UnaryOperatorExpression** extends UnaryOperatorExpressionBase
* **BinaryOperatorExpression** extends BinaryOperatorExpressionBase

#### Other expressions

* **FunctionCallExpression** extends FunctionCallExpressionBase
* **MemberExpression** extends MemberExpressionBase
* **ArrayExpression** extends ArrayExpressionBase
* **DictExpression** extends DictExpressionBase
* **IdentifierExpression** extends IdentifierExpressionBase



# Todo

1. Two constructors
2. Think about ast parsing and string or object (as property)
3. print an example as a json tree