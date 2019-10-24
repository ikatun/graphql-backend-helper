/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, InputType } from 'type-graphql';

import { EntityId, EntityIdScalar } from '../../EntityId';

// <keep-imports>
// </keep-imports>

@InputType()
export class AgentSearchInput {
  @Field(() => EntityIdScalar, { nullable: true })
  public id?: EntityId;

  @Field(() => String, { nullable: true })
  public firstName?: string | null;

  @Field(() => String, { nullable: true })
  public lastName?: string | null;

  // <keep-methods>
  // </keep-methods>
}
