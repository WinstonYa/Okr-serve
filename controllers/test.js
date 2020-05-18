const testController = {
  test: async (ctx, next) => {
    ctx.body = ({
      code:200
    })
  }
}

module.exports = testController;