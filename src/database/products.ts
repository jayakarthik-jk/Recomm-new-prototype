import type { Product as OriginalProduct, Room } from "@prisma/client";
import client, { matchError } from "./client";
import { ServerError } from "@/lib/error";
import {
  type CreateProductProps,
  type UpdateProductProps,
  createProductValidator,
  updateProductValidator,
} from "@/validation/product";
import { idValidator } from "@/validation/objectId";

const userItems = {
  id: true,
  description: true,
  pictures: true,
  price: true,
  room: true,
  buyerId: true,
  buyer: true,
  modelId: true,
  model: true,
  ownerId: true,
  owner: true,
  createdAt: true,
  updatedAt: true,
};

type Product = Omit<OriginalProduct, "favoritedUserId">;

export const getProduct = async (
  id: string
): Promise<Product | ServerError> => {
  try {
    const { error } = idValidator.validate(id);
    if (error != null) {
      return new ServerError(error.message, 400);
    }
    const product = await client.product.findUnique({
      where: { id },
      select: userItems,
    });
    if (product == null) {
      return new ServerError("Product not found", 404);
    }
    return product;
  } catch (error) {
    return matchError(
      error,
      "Product",
      `Cannot get the product with id: ${id}`
    );
  }
};

// TODO: check if this function is needed. If not, remove it
export const getProducts = async ({
  search,
  sortOrder,
  sortBy,
  page,
  limit,
}: FunctionalityOptions): Promise<Product[] | ServerError> => {
  try {
    const allProducts = await client.product.findMany({
      where: {
        OR: [
          {
            model: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            model: {
              brand: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        model: {
          name: sortBy === "name" ? sortOrder : undefined,
        },
        createdAt: sortBy === "createdAt" ? sortOrder : undefined,
      },
      select: userItems,
    });
    return allProducts;
  } catch (error) {
    return matchError(error, "Products", "Cannot get the products");
  }
};

export const createProduct = async ({
  userId,
  modelId,
  price,
  description,
  pictures,
  duration,
}: CreateProductProps): Promise<Product | ServerError> => {
  const { error } = createProductValidator.validate({
    userId,
    modelId,
    price,
    description,
    pictures,
    duration,
  });
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const model = await client.model.findUnique({
      where: {
        id: modelId,
      },
    });
    if (model == null) {
      return new ServerError("Model not found");
    }

    const product = await client.product.create({
      data: {
        model: {
          connect: {
            id: model.id,
          },
        },
        owner: {
          connect: {
            id: userId,
          },
        },
        price,
        description,
        pictures,
        room: {
          create: {
            duration,
          },
        },
      },
      select: userItems,
    });
    return product;
  } catch (error) {
    return matchError(
      error,
      "Product",
      `Cannot create the product with model id: ${modelId}`
    );
  }
};

export const updateProduct = async ({
  id,
  price,
  pictures,
  description,
}: UpdateProductProps): Promise<Product | ServerError> => {
  const { error } = updateProductValidator.validate({ id, price, pictures });
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const product = await client.product.update({
      where: {
        id,
      },
      data: {
        price,
        pictures,
        description,
      },
      select: userItems,
    });
    return product;
  } catch (error) {
    return matchError(
      error,
      "Product",
      `Cannot update the product with id: ${id}`
    );
  }
};

export const deleteProduct = async (
  id: string
): Promise<Product | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const product = await client.product.delete({
      where: {
        id,
      },
      select: userItems,
    });
    return product;
  } catch (error) {
    return matchError(
      error,
      "Product",
      `Cannot delete the product with id: ${id}`
    );
  }
};

export const getRoomByProduct = async (
  id: string,
  { search, page, limit }: FunctionalityOptions
): Promise<Room | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }
  try {
    const room = await client.room.findUnique({
      where: {
        productId: id,
      },
      include: {
        bids: {
          where: {
            OR: [
              {
                user: {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
              {
                user: {
                  email: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
            ],
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
          },
        },
      },
    });
    if (room == null) {
      return new ServerError("Room not found", 404);
    }
    return room;
  } catch (error) {
    return matchError(
      error,
      "Room",
      `Cannot get the room of the product with id: ${id}`
    );
  }
};
