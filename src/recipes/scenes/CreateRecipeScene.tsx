import React, {FormEvent} from "react";

export class CreateRecipeScene extends React.PureComponent {
  public render() {
    return (<div>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="recipeName">Recipe Name</label>
        <input type="text" name="recipeName" placeholder={"Enter a recipe name."}/>

        <input type="submit" value={"Create recipe"}/>
      </form>
    </div>);
  }

  private handleSubmit(event: FormEvent): void {
    return undefined;
  }
}
