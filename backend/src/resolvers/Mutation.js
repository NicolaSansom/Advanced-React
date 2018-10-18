// The resolvers actually reach out to the prisma database and get, add, change or delete things
const mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO Check if they are logged in
    const item = await ctx.db.mutation.createItem({ data: { ...args } }, info);
    return item;
  },
  updateItem(parent, args, ctx, info) {
    // first take a copy of the update
    const updates = { ...args };
    // remove id
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: { ...updates },
        where: { id: args.id },
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // find the item
    const item = await ctx.db.query.item({ where }, `{id title}`);
    // Check is they own the item or are delete
    // TODO
    // Delete it!
    return ctx.db.mutation.deleteItem(
      {
        where,
      },
      info
    );
  },
};

module.exports = mutations;
