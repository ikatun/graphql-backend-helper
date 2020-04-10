import {Field, InputType} from "type-graphql";

@InputType()
export class EmailVerificationInput {
  @Field()
  verificationCode: string;
}
