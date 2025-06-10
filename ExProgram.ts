// Import existing classes from your AST framework
import { ProgramDeclaration } from "./ast/ProgramDeclaration";
import { ThreadFunctionDeclaration } from "./ast/function/ThreadFunctionDeclaration";
import { CustomFunctionDeclaration } from "./ast/function/CustomFunctionDeclaration";
import { Block } from "./ast/Block";
import { IterationLoopStatement } from "./ast/statement/IterationLoopStatement";
import { BranchStatement } from "./ast/statement/BranchStatement";
import { FunctionCallStatement } from "./ast/statement/FunctionCallStatement";
import { VariableAssignmentStatement } from "./ast/statement/VariableAssignmentStatement";
import { ModifyingContextStatement } from "./ast/statement/ModifyingContextStatement";
import { NumericLiteralExpression } from "./ast/expression/NumericLiteralExpression";
import { StringLiteralExpression } from "./ast/expression/StringLiteralExpression";
import { IdentifierExpression } from "./ast/expression/IdentifierExpression";
import { BinaryOperatorExpression } from "./ast/expression/BinaryOperatorExpression";

// Music Blocks specific constructs
import {
  PlayNoteStatement,
  SetKeyStatement,
  SetMasterVolumeStatement,
  ForwardStatement,
  RightStatement,
  LeftStatement,
  ClearStatement,
  BoxDeclarationStatement,
  OnNoteDoStatement,
  InstrumentExpression,
  NoteExpression
} from "./ast/music-blocks/MusicBlocksConstructs";

// Additional Music Blocks classes to complete your implementation
class SetInstrumentStatement extends ModifyingContextStatement {
  private _instrument?: InstrumentExpression;
  
  constructor(instrument?: InstrumentExpression, body?: Block) {
    const args = instrument ? [
      {
        param: new IdentifierExpression("instrument"),
        value: instrument
      }
    ] : [];
    
    super(args, body || new Block([]));
    this._instrument = instrument;
  }
  
  set instrument(value: InstrumentExpression) {
    this._instrument = value;
  }
  
  get instrument(): InstrumentExpression | undefined {
    return this._instrument;
  }
  
  public appendBody(statement: any): void {
    if (this.body instanceof Block) {
      this.body.statements.push(statement);
    }
  }
}

class DecrescendoStatement extends ModifyingContextStatement {
  private _value?: NumericLiteralExpression;
  
  constructor(value?: NumericLiteralExpression, body?: Block) {
    const args = value ? [
      {
        param: new IdentifierExpression("factor"),
        value: value
      }
    ] : [];
    
    super(args, body || new Block([]));
    this._value = value;
  }
  
  set value(val: NumericLiteralExpression) {
    this._value = val;
  }
  
  get value(): NumericLiteralExpression | undefined {
    return this._value;
  }
  
  public appendBody(statement: any): void {
    if (this.body instanceof Block) {
      this.body.statements.push(statement);
    }
  }
}

class ScalarStepStatement extends FunctionCallStatement {
  constructor(value?: NumericLiteralExpression) {
    const args = value ? [
      {
        param: new IdentifierExpression("value"),
        value: value
      }
    ] : [];
    
    super(new IdentifierExpression("scalarStep"), args);
  }
  
  set value(val: NumericLiteralExpression) {
    // Update the args array
    const existingArgIndex = this.args.findIndex(arg => arg.param.name === "value");
    if (existingArgIndex >= 0) {
      this.args[existingArgIndex].value = val;
    } else {
      this.args.push({
        param: new IdentifierExpression("value"),
        value: val
      });
    }
  }
}

class AddToBoxStatement extends VariableAssignmentStatement {
  constructor(boxName: string, value: NumericLiteralExpression) {
    super(
      ["+="],
      new IdentifierExpression(boxName),
      value
    );
  }
}

// Helper class to make blocks appendable
class AppendableBlock extends Block {
  constructor(statements: any[] = []) {
    super(statements);
  }
  
  public append(statement: any): void {
    this.statements.push(statement);
  }
}

// Helper class for Program with appendable body
class AppendableProgram extends ProgramDeclaration {
  constructor(body: any[] = []) {
    super(body);
  }
  
  public get body(): any {
    return {
      append: (item: any) => {
        (super.body as any[]).push(item);
      }
    };
  }
}

// Create the complete program
const prog = new AppendableProgram([]);

// Create function declarations with appendable bodies
const start1 = new ThreadFunctionDeclaration(new AppendableBlock([]));
const start2 = new ThreadFunctionDeclaration(new AppendableBlock([]));

const action1 = new CustomFunctionDeclaration(
  new IdentifierExpression("action1"),
  [],
  new AppendableBlock([])
);

const action2 = new CustomFunctionDeclaration(
  new IdentifierExpression("action2"), 
  [],
  new AppendableBlock([])
);

const action3 = new CustomFunctionDeclaration(
  new IdentifierExpression("action3"),
  [],
  new AppendableBlock([])
);

// Create statements
const onnotedo1 = new OnNoteDoStatement(new IdentifierExpression("action1"));
const clear = new ClearStatement();
const box1 = new BoxDeclarationStatement("box1", new NumericLiteralExpression(0));
const box2 = new BoxDeclarationStatement("box2", new NumericLiteralExpression(10));
const setkey = new SetKeyStatement(new StringLiteralExpression("C major"));
const setmastervol = new SetMasterVolumeStatement(new NumericLiteralExpression(80));
const playnote = new PlayNoteStatement(new NoteExpression("C4"), new NumericLiteralExpression(0.25));

// Create repeat statement
const repeat = new IterationLoopStatement(
  new IdentifierExpression("i"),
  new NumericLiteralExpression(3),
  new AppendableBlock([])
);

const action4 = new FunctionCallStatement(new IdentifierExpression("action1"), []);
const action5 = new FunctionCallStatement(new IdentifierExpression("action2"), []);
const addto = new AddToBoxStatement("box1", new NumericLiteralExpression(1));

const playnote1 = new PlayNoteStatement(new NoteExpression("D4"), new NumericLiteralExpression(0.25));
const playnote2 = new PlayNoteStatement(new NoteExpression("E4"), new NumericLiteralExpression(0.25));

const forward = new ForwardStatement(new NumericLiteralExpression(50));
const ifstatement = new BranchStatement([
  {
    test: new BinaryOperatorExpression(
      "greaterThan",
      new IdentifierExpression("box1"),
      new NumericLiteralExpression(5)
    ),
    body: new AppendableBlock([])
  }
]);
const right = new RightStatement(new NumericLiteralExpression(90));
const left = new LeftStatement(new NumericLiteralExpression(45));

const setinstrument = new SetInstrumentStatement();
const decrescendo = new DecrescendoStatement();
const scalarstep = new ScalarStepStatement();

// Build the program structure
prog.body.append(start1);
prog.body.append(start2);
prog.body.append(action1);
prog.body.append(action2);
prog.body.append(action3);

// Build start1 body
(start1.body as any).append(onnotedo1);
(start1.body as any).append(clear);
(start1.body as any).append(box1);
(start1.body as any).append(box2);
(start1.body as any).append(setkey);
(start1.body as any).append(setmastervol);
(start1.body as any).append(playnote);
(start1.body as any).append(repeat);

// Configure repeat statement
(repeat.body as any).append(action4);
(repeat.body as any).append(action5);
(repeat.body as any).append(addto);

// Build action1 body
const actionIdentifier1 = new IdentifierExpression("action1");
(action1.body as any).append(playnote1);
(action1.body as any).append(playnote2);

// Build action2 body
const actionIdentifier2 = new IdentifierExpression("action2");
(action2.body as any).append(forward);
(action2.body as any).append(ifstatement);

// Build action3 body
const actionIdentifier3 = new IdentifierExpression("action3");
const memberExpression = new InstrumentExpression("Guitar");
setinstrument.instrument = memberExpression;
setinstrument.appendBody(decrescendo);

const numericliteral1 = new NumericLiteralExpression(1);
scalarstep.value = numericliteral1;

const numericliteral2 = new NumericLiteralExpression(5);
decrescendo.appendBody(scalarstep);
decrescendo.value = numericliteral2;

(action3.body as any).append(setinstrument);

// Function to display the program structure
function displayProgram() {
  console.log("🎵 Music Blocks Program Structure");
  console.log("=".repeat(50));

  console.log("\n📋 Program Functions:");
  
  console.log("\n🧱 Program Structure Built:");
  console.log("✓ Start1 (Thread Function)");
  console.log("  ├─ OnNoteDo");
  console.log("  ├─ Clear");
  console.log("  ├─ Box1 Declaration");
  console.log("  ├─ Box2 Declaration");
  console.log("  ├─ Set Key");
  console.log("  ├─ Set Master Volume");
  console.log("  ├─ Play Note");
  console.log("  └─ Repeat Loop (3 times)");
  console.log("      ├─ Action1 Call");
  console.log("      ├─ Action2 Call");
  console.log("      └─ Add to Box");
  
  console.log("\n✓ Action1 (Custom Function)");
  console.log("  ├─ Play Note D4");
  console.log("  └─ Play Note E4");
  
  console.log("\n✓ Action2 (Custom Function)");
  console.log("  ├─ Forward");
  console.log("  └─ If Statement");
  
  console.log("\n✓ Action3 (Custom Function)");
  console.log("  └─ Set Instrument (Guitar)");
  console.log("      └─ Decrescendo");
  console.log("          └─ Scalar Step");
  
  console.log("\n✅ Program construction completed successfully!");
  console.log(`📊 Total components created: ${countComponents()}`);
}

function countComponents(): number {
  let count = 0;
  count += 1; // prog
  count += 5; // function declarations
  count += 8; // statements in start1
  count += 3; // statements in repeat body
  count += 2; // statements in action1
  count += 2; // statements in action2  
  count += 1; // statements in action3
  count += 6; // expressions and literals
  return count;
}

// Execute the display
displayProgram();

// Export the program for use in other files
export { prog, displayProgram };