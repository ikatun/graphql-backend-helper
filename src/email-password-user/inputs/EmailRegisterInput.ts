import {InputType, Field} from "type-graphql";

@InputType()
export class EmailRegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;
}
