const util = require('util');

/** node representing a number */
class NumberNode {
  /**
   * instantiates a number node
   * @param {Token} tok token to use as the nodes value
   */
  constructor(tok) {
    this.tok = tok;

    this.posStart = this.tok.posStart;
    this.posEnd = this.tok.posEnd;
  }

  [util.inspect.custom](depth, options) {
    return this.toString();
  }

  /**
   * custom representation of the class
   * @returns {String}
   */
  toString() {
    return this.tok.toString();
  }
}

/** node representing a string */
class StringNode {
  /**
   * instantiates a string node
   * @param {Token} tok token to use as the nodes value
   */
  constructor(tok) {
    this.tok = tok;

    this.posStart = this.tok.posStart;
    this.posEnd = this.tok.posEnd;
  }

  [util.inspect.custom](depth, options) {
    return this.toString();
  }

  /**
   * custom representation of the class
   * @returns {String}
   */
  toString() {
    return this.tok.toString();
  }
}

/** node representing an object */
class ObjectNode {
  constructor(propertyNodes, posStart, posEnd) {
    this.propertyNodes = propertyNodes;

    this.posStart = posStart;
    this.posEnd = posEnd;
  }
}

/** node representing a list */
class ListNode {
  constructor(elementNodes, posStart, posEnd) {
    this.elementNodes = elementNodes;

    this.posStart = posStart;
    this.posEnd = posEnd;
  }
}

/** node representing a property access result */
class PropAccessNode {
  /**
   * instantiates a property access node
   * @param {Token} varNameTok token containing the property's name
   * @param {PropAccessNode} parent node containing any parent properties being accessed
   */
  constructor(varNameTok, parent = null) {
    this.varNameTok = varNameTok;
    this.parent = parent;

    this.posStart = this.varNameTok.posStart;
    this.posEnd = this.varNameTok.posEnd;
  }
}

/** node representing a property assignment */
class PropAssignNode {
  /**
   * instantiates a property assignment node
   * @param {Token[]} nodeChain list of tokens containing the property's name
   * @param {Node} valueNode node containing the value to be assigned to the property
   */
  constructor(nodeChain, valueNode) {
    this.nodeChain = nodeChain;
    this.valueNode = valueNode;

    this.posStart = this.nodeChain[0].posStart;
    this.posEnd = this.valueNode.posEnd;
  }
}

/** node representing a variable access result */
class VarAccessNode {
  /**
   * instantiates a variable access node
   * @param {Token} varNameTok token containing the variable's name
   */
  constructor(varNameTok) {
    this.varNameTok = varNameTok;

    this.posStart = this.varNameTok.posStart;
    this.posEnd = this.varNameTok.posEnd;
  }
}

/** node representing a variable assignment */
class VarAssignNode {
  /**
   * instantiates a variable assignment node
   * @param {Token} varNameTok token containing the variable's name
   * @param {Node} valueNode node containing the value to be assigned to the variable
   */
  constructor(varNameTok, valueNode) {
    this.varNameTok = varNameTok;
    this.valueNode = valueNode;

    this.posStart = this.varNameTok.posStart;
    this.posEnd = this.valueNode.posEnd;
  }
}

/** node representing a variable definition */
class VarDefNode {
  /**
   * instantiates a variable definition node
   * @param {Token} varNameTok token containing the variable's name
   * @param {Node} valueNode node containing the value to be assigned to the variable
   */
  constructor(varNameTok, valueNode) {
    this.varNameTok = varNameTok;
    this.valueNode = valueNode;

    this.posStart = this.varNameTok.posStart;
    this.posEnd = this.valueNode.posEnd;
  }
}

/** node representing a binary operation */
class BinOpNode {
  /**
   * instantiates a binary operation node
   * @param {Node} leftNode node on the left of the binary operation
   * @param {Token} opTok token containing the operator
   * @param {Node} rightNode node on the right of the binary operation
   */
  constructor(leftNode, opTok, rightNode) {
    this.leftNode = leftNode;
    this.opTok = opTok;
    this.rightNode = rightNode;

    this.posStart = this.leftNode.posStart;
    this.posEnd = this.rightNode.posEnd;
  }

  [util.inspect.custom](depth, options) {
    return this.toString();
  }

  /**
   * custom representation of the class
   * @returns {String}
   */
  toString() {
    return `(${this.leftNode}, ${this.opTok}, ${this.rightNode})`;
  }
}

/** node representing a unary operation */
class UnaryOpNode {
  /**
   * instantiates a unary operation node
   * @param {Token} opTok token containing the operator
   * @param {Node} node node containing value to be operated on
   */
  constructor(opTok, node) {
    this.opTok = opTok;
    this.node = node;

    this.posStart = this.opTok.posStart;
    this.posEnd = this.node.posEnd;
  }

  [util.inspect.custom](depth, options) {
    return this.toString();
  }

  /**
   * custom representation of the class
   * @returns {String}
   */
  toString() {
    return `(${this.opTok}, ${this.node})`;
  }
}

/** node representing an IF block */
class IfNode {
  /**
   * instantiates an if node
   * @param {[]} cases list of cases containing conditions and result expressions
   * @param {*} elseCase expression to use if all cases evaluate to false
   */
  constructor(cases, elseCase) {
    this.cases = cases;
    this.elseCase = elseCase;

    this.posStart = this.cases[0][0].posStart;
    this.posEnd = (this.elseCase ||
      this.cases[this.cases.length - 1])[0].posEnd;
  }
}

/** node representing a FOR loop */
class ForNode {
  /**
   * instantiates a for node
   * @param {Token} varNameTok token containing the iterator's name
   * @param {Node} startValueNode node containing the value to start the iterator at
   * @param {Node} endValueNode node containing the value to end iteration at
   * @param {Node} stepValueNode node containing the value used to step through
   * @param {Node} bodyNode node containing the expressions to be run each iteration
   */
  constructor(
    varNameTok,
    startValueNode,
    endValueNode,
    stepValueNode,
    bodyNode
  ) {
    this.varNameTok = varNameTok;
    this.startValueNode = startValueNode;
    this.endValueNode = endValueNode;
    this.stepValueNode = stepValueNode;
    this.bodyNode = bodyNode;

    this.posStart = this.varNameTok.posStart;
    this.posEnd = this.bodyNode.posEnd;
  }
}

/** node representing a FOR-EACH loop */
class ForEachNode {
  /**
   * instantiates a for each node
   * @param {Token} varNameTok token containing the iterator's name
   * @param {Node} iterationNode node containing the values to iterate over
   * @param {Node} bodyNode node containing the expressions to be run each iteration
   */
  constructor(varNameTok, iterationNode, bodyNode) {
    this.varNameTok = varNameTok;
    this.iterationNode = iterationNode;
    this.bodyNode = bodyNode;

    this.posStart = this.varNameTok.posStart;
    this.posEnd = this.bodyNode.posEnd;
  }
}

/** node representing a WHILE loop */
class WhileNode {
  /**
   * instantiates a while node
   * @param {Node} conditionNode node containing the condition to be met
   * @param {Node} bodyNode node containing the expressions to run each iteration
   */
  constructor(conditionNode, bodyNode) {
    this.conditionNode = conditionNode;
    this.bodyNode = bodyNode;

    this.posStart = this.conditionNode.posStart;
    this.posEnd = this.bodyNode.posEnd;
  }
}

/** node representing a function definition */
class FuncDefNode {
  /**
   * instantiates a function definition node
   * @param {Token} varNameTok token containing the name of the function
   * @param {Token[]} argNameToks list of tokens containing names for the arguments
   * @param {Node} bodyNode node containing the expressions to run
   */
  constructor(varNameTok, argNameToks, bodyNode) {
    this.varNameTok = varNameTok;
    this.argNameToks = argNameToks;
    this.bodyNode = bodyNode;

    if (this.varNameTok) {
      this.posStart = this.varNameTok.posStart;
    } else if (this.argNameToks.length > 0) {
      this.posStart = this.argNameToks[0].posStart;
    } else {
      this.posStart = this.bodyNode.posStart;
    }

    this.posEnd = this.bodyNode.posEnd;
  }
}

/** node representing a function call */
class CallNode {
  /**
   * instantiate a function call node
   * @param {Node} nodeToCall node representing the function to be called
   * @param {Node[]} argNodes list of nodes containing argument values
   */
  constructor(nodeToCall, argNodes) {
    this.nodeToCall = nodeToCall;
    this.argNodes = argNodes;

    this.posStart = this.nodeToCall.posStart;

    if (this.argNodes.length > 0) {
      this.posEnd = this.argNodes[this.argNodes.length - 1].posEnd;
    } else {
      this.posEnd = this.nodeToCall.posEnd;
    }
  }
}

/** node representing a try-catch block */
class TryCatchNode {
  /**
   * instantiates a try-catch node
   * @param {Node} tryBodyNode node containing the expressions to try
   * @param {Token} errVarNameTok token containing the name of the variable to be used to hold the error
   * @param {Node} catchBodyNode node containing the expressions to run if try block fails
   * @param {Node} finallyBodyNode node containing the expressions to run after try/catch
   * @param {Position} posStart line/col position of the node
   * @param {Position} posEnd line/col position of the node
   */
  constructor(
    tryBodyNode,
    errVarNameTok,
    catchBodyNode,
    finallyBodyNode,
    posStart,
    posEnd
  ) {
    this.tryBodyNode = tryBodyNode;
    this.errVarNameTok = errVarNameTok;
    this.catchBodyNode = catchBodyNode;
    this.finallyBodyNode = finallyBodyNode;
    this.posStart = posStart;
    this.posEnd = posEnd;
  }
}

/** node representing a return value */
class ReturnNode {
  /**
   * instantiate a return value node
   * @param {Node} nodeToReturn node representing the value to be returned
   * @param {Position} posStart line/col position of the node
   * @param {Position} posEnd line/col position of the node
   */
  constructor(nodeToReturn, posStart, posEnd) {
    this.nodeToReturn = nodeToReturn;
    this.posStart = posStart;
    this.posEnd = posEnd;
  }
}

/** node representing a continue statement */
class ContinueNode {
  /**
   * instantiate a continue statement node
   * @param {Position} posStart line/col position of the node
   * @param {Position} posEnd line/col position of the node
   */
  constructor(posStart, posEnd) {
    this.posStart = posStart;
    this.posEnd = posEnd;
  }
}

/** node representing a break statement */
class BreakNode {
  /**
   * instantiate a break statement node
   * @param {Position} posStart line/col position of the node
   * @param {Position} posEnd line/col position of the node
   */
  constructor(posStart, posEnd) {
    this.posStart = posStart;
    this.posEnd = posEnd;
  }
}

/** node representing a thrown exception */
class ThrowNode {
  /**
   * instantiate a thrown exception node
   * @param {Node} nodeToThrow node representing the value to be thrown
   * @param {Position} posStart line/col position of the node
   * @param {Position} posEnd line/col position of the node
   */
  constructor(nodeToThrow, posStart, posEnd) {
    this.nodeToThrow = nodeToThrow;
    this.posStart = posStart;
    this.posEnd = posEnd;
  }
}

module.exports = {
  NumberNode,
  StringNode,
  ObjectNode,
  ListNode,
  PropAccessNode,
  PropAssignNode,
  VarAccessNode,
  VarAssignNode,
  VarDefNode,
  BinOpNode,
  UnaryOpNode,
  IfNode,
  ForNode,
  ForEachNode,
  WhileNode,
  FuncDefNode,
  CallNode,
  TryCatchNode,
  ReturnNode,
  ContinueNode,
  BreakNode,
  ThrowNode,
};
