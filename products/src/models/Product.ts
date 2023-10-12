import mongoose from "mongoose";

interface ProductAttr {
  title: string;
  price: number;
  userId: string;
}

interface ProductDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttr): ProductDoc;
}

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ProductSchema.statics.build = (attrs: ProductAttr) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  ProductSchema
);

export { Product };
