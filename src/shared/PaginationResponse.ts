import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export interface IPaginatedResponse<TItem> {
  items: Array<TItem>;
  total: number;
  hasMore: boolean;
  nextPage: number;
}

export function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType(`Paginated${TItemClass.name}Response`)
  abstract class PaginatedResponseClass implements IPaginatedResponse<TItem> {
    // here we use the runtime argument
    @Field(() => [TItemClass])
      // and here the generic type
    public items: Array<TItem>;

    @Field(() => Int)
    public total: number;

    @Field()
    public hasMore: boolean;

    @Field(() => Int)
    public nextPage: number;
  }

  return PaginatedResponseClass as ClassType<IPaginatedResponse<TItem>>;
}
