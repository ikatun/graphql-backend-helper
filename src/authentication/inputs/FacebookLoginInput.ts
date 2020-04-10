import {Field, InputType} from "type-graphql";

@InputType()
export class FacebookLoginInput {
  @Field(() => String, )
  public facebookAccessToken: string;
}
