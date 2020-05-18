const Todo = require('../models/todo');
const { formatTime } = require('./../utils/date')

const todoController = {
  all: async function (ctx, next) {
    try {
      let todo = await Todo.all();
      todo.forEach(item => {
        item.created_time = formatTime(item.created_time)
        item.finished_time = formatTime(item.finished_time)
      })
      ctx.body = ({
        code: 200,
        data: todo
      })
    } catch (e) {
      ctx.body = {
        code: 0,
        message: e
      }
    }
  },
  update: async function (ctx, next) {
    try {
      let id = ctx.request.body.id;
      let status = ctx.request.body.status;
      status = !status ? 1 : 0;
      let finished_time = status ? formatTime(new Date()) : null;
      console.log(finished_time)
      await Todo.update(id, { status, finished_time })
      ctx.body = ({
        code: 200,
        message: 'success'
      })
    } catch (e) {
      ctx.body = ({
        code: 0,
        message: e
      })
    }
  },
  delete: async function (ctx, next) {
    try {
      let id = ctx.request.body.id
      await Todo.delete(id)
      ctx.body = ({
        code: 200,
        message: 'success'
      })
    } catch (e) {
      ctx.body = ({
        code: 0,
        message: e
      })
    }
  },
  insert: async function (ctx, next) {
    try {
      let user_id = ctx.request.body.user_id;
      let title = ctx.request.body.value;
      let status = 0;
      let created_time = new Date();
      let finished_time = '';
      if (!title || !user_id) return;
      await Todo.insert({ user_id, title, status, created_time, finished_time })
      ctx.body = ({
        code: 200,
        message: 'success'
      })
    } catch (e) {
      ctx.body = {
        code: 0,
        message: e
      }
    }
  },
}

module.exports = todoController