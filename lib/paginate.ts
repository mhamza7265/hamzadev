import { Prisma } from "@/generated/prisma/client";

type PaginateOptions<T> = Omit<Prisma.Args<T, "findMany">, "skip" | "take"> & {
  page?: number;
  limit?: number;
};

export async function paginate<T, A extends Prisma.Args<T, "findMany">>(
  model: {
    findMany: (args: A) => Promise<Prisma.Result<T, A, "findMany">>;
    count(args?: { where?: Prisma.Args<T, "count">["where"] }): Promise<number>;
  },
  options: PaginateOptions<T>,
) {
  const { page = 1, limit = 10, ...args } = options;

  const currentPage = Math.max(1, page);
  const pageSize = Math.min(Math.max(1, limit), 100);

  const skip = (currentPage - 1) * pageSize;

  const [data, total] = await Promise.all([
    model.findMany({
      ...args,
      skip,
      take: pageSize,
    } as A),

    model.count({
      where: args.where as Prisma.Args<T, "count">["where"],
    }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return {
    data,
    meta: {
      page: currentPage,
      limit: pageSize,
      total,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  };
}
