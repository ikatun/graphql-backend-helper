import {Field, InputType} from "type-graphql";

@InputType()
export class EmailLoginInput {
  @Field(() => String, )
  public email: string;

  @Field(() => String, )
  public password: string;
}
