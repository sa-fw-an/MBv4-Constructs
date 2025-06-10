import { BinaryOperatorExpression as BinaryOperatorExpressionAbstract, Expression } from "../../abstracts";
import { TBinaryOperator } from "../../types/types";

export class BinaryOperatorExpression extends BinaryOperatorExpressionAbstract {
  constructor(operator: TBinaryOperator, left: Expression, right: Expression) {
    super("BinaryOperatorExpression", operator, left, right);
  }
}