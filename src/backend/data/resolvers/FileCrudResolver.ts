/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
// tslint:disable max-line-length
import { Arg, Args, Ctx, FieldResolver, ID, Info, Int, Mutation, Query, Resolver, Root } from 'type-graphql';

import { addEagerFlags } from '../../utils/add-eager-flags';
import * as auth from '../../utils/auth/auth-checkers';
import { getFindOptions } from '../../utils/get-find-options';
import { EntityId, EntityIdScalar } from '../EntityId';
import { FileCreateInput } from '../inputs/FileCreateInput';
import { FileEditInput } from '../inputs/FileEditInput';
import { FileSearchInput } from '../inputs/FileSearchInput';
import { FileSearchOrderInput } from '../inputs/FileSearchOrderInput';
import { IRequestContext } from '../IRequestContext';
import { File } from '../models/File';
import { PaginatedResponse } from '../PaginationResponse';

// <keep-imports>
// </keep-imports>

const PaginatedFileResponse = PaginatedResponse(File);

@Resolver(File)
export class FileCrudResolver {
  @Query(() => File)
  public async file(@Arg('id', () => EntityIdScalar) id: number, @Info() info, @Ctx() ctx: IRequestContext) {
    return addEagerFlags(await ctx.em.findOneOrFail(File, id, getFindOptions(File, info)));
  }

  @Query(() => PaginatedFileResponse)
  public async searchFiles(
    @Arg('search', () => FileSearchInput, { nullable: true }) search: FileSearchInput | null = null,
    @Arg('skip', () => Int, { nullable: true }) skip: number = 0,
    @Arg('take', () => Int, { nullable: true }) take: number = 25,
    @Arg('order', () => [FileSearchOrderInput], { nullable: true }) order: Array<FileSearchOrderInput> = [],
    @Info() info,
    @Ctx() ctx: IRequestContext,
  ) {
    const defaultFindOptions = getFindOptions(File, info, { transformQueryPath: x => x.replace(/^items./, '') });

    const [items, total] = addEagerFlags(await ctx.em.findAndCount(File, {
      ...defaultFindOptions,
      skip,
      take,
      where: JSON.parse(JSON.stringify(search)),
      order: JSON.parse(JSON.stringify(Object.assign({}, ...order))),
    }));

    return {
      items,
      total,
      hasMore: skip + take < total,
    };
  }

  @Query(() => [File])
  public async files(@Info() info, @Ctx() ctx: IRequestContext) {
    return addEagerFlags(await ctx.em.find(File, getFindOptions(File, info)));
  }

  @Mutation(() => File)
  public async createFile(@Arg('input') input: FileCreateInput, @Ctx() ctx: IRequestContext): Promise<File> {
    const model = new File();
    await model.update(input, ctx);

    await ctx.em.save(ctx.modelsToSave);

    return model;
  }

  @Mutation(() => File)
  public async updateFile(@Arg('input') input: FileEditInput, @Ctx() ctx: IRequestContext) {
    const model = await ctx.em.findOneOrFail(File, input.id);
    await model.update(input, ctx);

    // <keep-update-code>
    // </keep-update-code>

    await ctx.em.save(ctx.modelsToSave);

    return model;
  }

  @Mutation(() => Boolean)
  public async deleteFiles(@Arg('ids', () => [ID]) ids: Array<EntityId>, @Ctx() ctx: IRequestContext): Promise<boolean> {
    const entities = await ctx.em.findByIds(File, ids);
    await auth.assertCanDelete(entities, ctx);
    await ctx.em.remove(entities);

    return true;
  }

  // <keep-methods>
  // </keep-methods>
}
