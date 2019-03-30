/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
// tslint:disable max-line-length no-duplicate-imports
import { Field, ID, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { File } from './File';
import { User } from './User';

import { asPromise } from '../../utils/as-promise';
import * as auth from '../../utils/auth/auth-checkers';
import { IAuthorizable } from '../../utils/auth/IAuthorizable';
import { getInputOperationType } from '../../utils/get-input-operation-type';
import { PostAuth } from '../auth/PostAuth';
import { EntityId, EntityIdScalar } from '../EntityId';
import { PostCreateInput } from '../inputs/PostCreateInput';
import { PostEditInput } from '../inputs/PostEditInput';
import { PostNestedInput } from '../inputs/PostNestedInput';
import { IRequestContext } from '../IRequestContext';
import {  } from './update-operations/post-update-operations';

// <keep-imports>
// </keep-imports>

// <keep-decorators>
// </keep-decorators>
@Entity()
@ObjectType()
export class Post implements IAuthorizable {
  @Field(() => EntityIdScalar)
  @PrimaryGeneratedColumn()
  public id: EntityId;

  public authorizationChecker = new PostAuth(this);

  @Field(() => String)
  @Column({
    // <custom-column-args>
    // </custom-column-args>
  })
  public content: string;

  @Field(() => String)
  @Column({
    // <custom-column-args>
    // </custom-column-args>
  })
  public title: string;

  @ManyToOne(() => User, (user) => user.posts , { nullable: false, onDelete: 'CASCADE' })
  @Field(() => User , { nullable: false })
  public author: Promise<User>;

  @OneToMany(() => File, (file) => file.post)
  @Field(() => [File])
  public images: Promise<Array<File>>;

  @CreateDateColumn()
  @Field()
  public createdAt: Date;

  @UpdateDateColumn()
  @Field()
  public updatedAt: Date;

  public async update(input: PostCreateInput | PostEditInput | PostNestedInput, context: IRequestContext) {
    const data = input;
    if (getInputOperationType(this, input) === 'update') {
      await auth.assertCanUpdate(this, context);
    }
    Object.assign(this, data);

    if (getInputOperationType(this, input) === 'create') {
      this.author = asPromise(await this.author || await context.user);
    }

    context.modelsToSave.push(this);

    // <keep-update-code>
    // </keep-update-code>
    await auth.assertCanPersist(this, context);

    return this;
  }

  // <keep-methods>
  // </keep-methods>
}
