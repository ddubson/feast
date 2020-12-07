import {Just, Maybe, Nothing} from "purify-ts/Maybe";
import {Step} from "@ddubson/feast-domain";

export const toStepPresenters = (steps: Maybe<Step[]>): Maybe<StepPresenter[]> => {
  return steps.mapOrDefault(
    (s: Step[]) => Just(s.map((step) => new StepPresenter(step))),
    Nothing);
};

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
