import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
export class Recipe {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(_type => [Int])
  ratings: number[];
}
