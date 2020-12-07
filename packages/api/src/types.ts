export interface APIMessage {
  message: string;
}

export const RecipeNotFound: APIMessage = {message: "Recipe not found."}

export type ResultOrApiMessage<RESULT> = RESULT | APIMessage
