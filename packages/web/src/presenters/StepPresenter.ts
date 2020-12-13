import {Maybe} from "purify-ts/Maybe";
import {Step} from "@ddubson/feast-domain";

export const toStepPresenters = (steps: Maybe<Step[]>): Maybe<StepPresenter[]> =>
  steps.map<StepPresenter[]>((stepArray) => stepArray.map(s => new StepPresenter(s)));

export default class StepPresenter {
  constructor(private step: Step) {
  }

  get stepNumber(): number {
    return this.step.stepNumber;
  }

  get stepValue(): string {
    return this.step.value;
  }
}
