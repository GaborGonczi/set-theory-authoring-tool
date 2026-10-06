import { Component, inject } from '@angular/core';
import { SET_THEORY_OPERATORS_IMPORTS } from '@src/app/features/evaluator/components/tools/components/set-theory-operators/set-theory-operators.imports';
import { EditorContext } from '@src/app/features/evaluator/services/editor-context';


type Button = {
  name:string;
  value:string;
  tooltip:string;
}

@Component({
  imports: SET_THEORY_OPERATORS_IMPORTS,
  selector: 'app-set-theory-operators',
  styleUrl: './set-theory-operators.scss',
  templateUrl: './set-theory-operators.html',
})
export class SetTheoryOperators {
  private context = inject(EditorContext);
  
  public buttons:Button[] = [
    {
      name:'toBeEqual',
      value:':=',
      tooltip:'legyen egyenlő'
    },
    {
      name:'elementOf',
      value:'∈',
      tooltip:'eleme'
    },
    {
      name:'notElementOf',
      value:'∉',
      tooltip:'nem eleme'
    },
    {
      name:'equal',
      value:'=',
      tooltip:'egyenlő'
    },
    {
      name:'subsetOf',
      value:'⊆',
      tooltip:'részhalmaz'
    },
    {
      name:'realSubsetOf',
      value:'⊂',
      tooltip:'valódi részhalmaz'
    },
    {
      name:'complement',
      value:'∁',
      tooltip:'komplementer'
    },
    {
      name:'union',
      value:'∪',
      tooltip:'únió'
    },
    {
      name:'intersection',
      value:'∩',
      tooltip:'metszet'
    },
    {
      name:'logicalAnd',
      value:'∧',
      tooltip:'logikai és'
    },
    {
      name:'logicalOr',
      value:'∨',
      tooltip:'logikai vagy'
    },
    {
      name:'setminus',
      value:'∖',
      tooltip:'különbség'
    },
    {
      name:'divides',
      value:'∣',
      tooltip:'osztható'
    },
    {
      name:'doesNotDivide',
      value:'∤',
      tooltip:'nem osztható'
    },
    {
      name:'cardinality',
      value:'||',
      tooltip:'számosság'
    }
  ];

  public addOperatorToContext(value:string) {
    this.context.setOperator(value);
  }

}


