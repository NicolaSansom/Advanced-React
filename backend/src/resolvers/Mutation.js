// The resolvers actually reach out to the prisma database and get, add, change or delete things
const mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO Check if they are logged in
    const item = await ctx.db.mutation.createItem({ data: { ...args } }, info);
    return item;
  }
};

module.exports = mutations;
