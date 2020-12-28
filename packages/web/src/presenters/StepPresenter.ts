import {Step} from "@ddubson/feast-domain";

export const toStepPresenters = (steps: Step[]): StepPresenter[] =>
  steps.map(s => new StepPresenter(s));

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
