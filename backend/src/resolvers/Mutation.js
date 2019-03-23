const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // hash there password
    const password = await bcrypt.hash(args.password, 10);
    // create user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: { ...args, password, permissions: { set: ['USER'] } },
      },
      info
    );
    // create jwt token for them after creating an account
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });

    // Finally return user to the browser
    return user;
  },
};

module.exports = mutations;
