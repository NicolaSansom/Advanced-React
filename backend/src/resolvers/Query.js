const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // }
  items: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  item: forwardTo('db'),
  // check if there is a current user id
  me(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }

    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do this');
    }
    // 2. Check if the user has the permissions to query all of the user
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    // 3. If they do, query all the users!
    return ctx.db.query.users({}, info);
  },
};

module.exports = Query;
