import { Field, ObjectType, Int, Float } from "type-graphql";

import { CacheControl } from "./cache-control";
import { getTime } from "./utils";

@ObjectType()
export class Recipe {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [Int])
  ratings: number[];

  @Field()
  creationDate: Date;

  @Field(type => Float, { nullable: true })
  // will invalidate `cachedRecipe` cache with maxAge of 60 to 10
  // if the field is requested
  @CacheControl({ maxAge: 10 })
  get cachedAverageRating() {
    console.log(`Called 'cachedAverageRating' for recipe '${this.title}' on ${getTime()}`);
    return this.averageRating;
  }

  @Field(type => Float, { nullable: true })
  get averageRating(): number | null {
    console.log(`Called 'averageRating' for recipe '${this.title}' on ${getTime()}`);
    const ratingsCount = this.ratings.length;
    if (ratingsCount === 0) {
      return null;
    }
    const ratingsSum = this.ratings.reduce((a, b) => a + b, 0);
    return ratingsSum / ratingsCount;
  }
}
