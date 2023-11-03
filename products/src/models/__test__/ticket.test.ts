import { Product } from "../Product";

it("implements optimistic concurrency control", async () => {
  const product = Product.build({
    title: "book",
    price: 10,
    userId: "123",
  });

  product.save();

  const first = await Product.findById(product.id);
  const second = await Product.findById(product.id);

  first!.set({ price: 100 });
  second!.set({ price: 150 });

  await first!.save();

  try {
    await second!.save();
  } catch (err) {
    return;
  }
});
