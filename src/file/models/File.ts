/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, ObjectType } from 'type-graphql';
import { Column, JoinColumn, Entity, OneToOne, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { User } from '../../user/models/User';
import { Post } from '../../post/models/Post';

import * as auth from '../../authorization/auth-checkers';
import { FileCreateInput } from '../inputs/FileCreateInput';
import { FileEditInput } from '../inputs/FileEditInput';
import { FileNestedInput } from '../inputs/FileNestedInput';
import { IRequestContext } from '../../shared/IRequestContext';
import { IAuthorizable } from '../../authorization/IAuthorizable';
import { EntityId, EntityIdScalar } from '../../shared/EntityId';
import { FileAuth } from '../auth/FileAuth';
import { getInputOperationType } from '../../shared/get-input-operation-type';
import { noChange } from '../../shared/no-change';
import { asPromise } from '../../shared/as-promise';

import { updateUserRelation,updatePostRelation } from './update-operations/file-update-operations';

// <keep-imports>
// </keep-imports>

// <keep-decorators>
// </keep-decorators>
@Entity()
@ObjectType()
export class File implements IAuthorizable {
  @Field(() => EntityIdScalar)
  @PrimaryGeneratedColumn()
  id: EntityId;

  public authorizationChecker = new FileAuth(this);

  @Field(() => String, )
  @Column({"type":"text",
    // <custom-column-args>
    // </custom-column-args>
  })
  public contentBase64: string;

  
  @Column({
    // <custom-column-args>
    // </custom-column-args>
  })
  public slug: string;

  @ManyToOne(() => Post, (post) => post.images , {"nullable":true,"onDelete":"SET NULL"})
  @Field(() => Post , {"nullable":true})
  public post: Promise<Post | undefined | null>;

  @OneToOne(() => User, (user) => user.profileImage , {"nullable":true,"onDelete":"SET NULL"})
  @Field(() => User , {"nullable":true})
  @JoinColumn()
  public user: Promise<User | undefined | null>;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  public async update(input: FileCreateInput | FileEditInput | FileNestedInput, context: IRequestContext) {
    const { post, user, ...data } = input;
    if (noChange(input)) {
      return this;
    }
    if (getInputOperationType(this, input) === 'update') {
      await auth.assertCanUpdate(this, context);
    }
    Object.assign(this, data);

    await updatePostRelation(this, post, context);

    await updateUserRelation(this, user, context);

    context.modelsToSave.push(this);

    // <keep-update-code>
    // </keep-update-code>
    await auth.assertCanPersist(this, context);

    return this;
  }

  // <keep-methods>
  // </keep-methods>
}