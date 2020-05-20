const Objective = require('../models/objective');
const Keyresult = require('../models/keyresult');
const todoKeyresult = require('../models/todo_keyresult');
const Todo = require('../models/todo');
const { formatTime } = require('../utils/date');

const okrList = {
  all: async function (ctx, next) {
    try {
      let objective = await Objective.all();
      objective.forEach(item => {
        item.created_time = formatTime(item.created_time)
        if (item.finished_time) {
          item.finished_time = formatTime(item.finished_time)
          return
        }
      })
      ctx.body = ({
        code: 200,
        data: objective
      })
    } catch (e) {
      ctx.body = ({
        code: 0,
        message: e
      })
    }
  },
  create: async function (ctx, next) {
    try {
      let user_id = ctx.request.body.user_id;
      let objective = ctx.request.body.objective;
      let keyresult = ctx.request.body.keyresults;
      let status = 0;
      let created_time = new Date();
      if (!user_id || !objective || !keyresult) {
        ctx.body = ({
          code: 0,
          message: '获取参数错误'
        })
        return
      }
      let objectives = await Objective.insert({ user_id, title: objective, status, created_time });
      let objective_id = objectives[0];
      keyresult.forEach(async data => {
        let title = data.title;
        await Keyresult.insert({ objective_id, title, status, created_time })
      })
      ctx.body = ({
        code: 200,
        message: '添加成功'
      })
    } catch (e) {
      ctx.body = ({
        code: 0,
        message: '请求错误'
      })
    }
  },
  editShow: async function (ctx, next) {
    let id = ctx.params.id;
    try {
      let objectives = await Objective.select({ id });
      let title = objectives.map(data => data.title)
      let keyresults = await Keyresult.select({ objective_id: id })
      ctx.body = ({
        code: 200,
        data: { title, keyresults }
      })
    } catch (e) {
      ctx.body = ({
        code: 0,
        messsage: '服务器错误'
      })
    }
  },
  edit: async function (ctx, next) {
    try {
      let id = ctx.params.id;
      let objective = ctx.request.body.title;
      let keyresults = ctx.request.body.keyresults;
      let deleteId = ctx.request.body.deleteId;
      let status = 0;
      let created_time = new Date();
      await Objective.update(id, { title: objective, created_time });
      keyresults.forEach(async data => {
        if (data.id) {
          await Keyresult.update(data.id, { title: data.title, status, created_time })
        } else {
          await Keyresult.insert({ objective_id: id, title: data.title, status, created_time })
        }
      })
      if (deleteId) {
        deleteId.forEach(async data => await Keyresult.delete(data))
        await todoKeyresult.knex().whereIn('Keyresult_id', deleteId).del()
      }
      ctx.body = ({
        code: 200,
        message: '修改成功'
      })
    } catch (e) {
      ctx.body = ({
        code: 0,
        message: '服务器错误'
      })
    }
  },
  delete: async function (ctx, next) {
    try {
      let id = ctx.params.id;
      await Objective.delete(id);
      let kyData = await Keyresult.select({ objective_id: id });
      let kyId = kyData.map(data => data.id);
      await Keyresult.select({ objective_id: id }).del();
      await todoKeyresult.knex().whereIn('keyresult_id', kyId).del();
      ctx.body = ({
        code: 200,
        message: '删除成功'
      })
    } catch (e) {
      ctx.body = ({
        code: 0,
        message: '服务器错误'
      })
    }
  },
  detailShow: async function (ctx, next) {
    try {
      let id = ctx.params.id;
      let objective = await Objective.select({ id });
      let keyresults = await Keyresult.select({ objective_id: id });
      objective.forEach(data => {
        data.created_time = formatTime(data.created_time)
        if (data.finished_time) {
          data.finished_time = formatTime(data.finished_time)
        } else {
          data.finished_time = '未完成'
        }
      })
      let keyresult_id = keyresults.map(data => data.id);
      let todoKeyresults = await todoKeyresult.knex().whereIn('keyresult_id', keyresult_id);
      let todo_ids = todoKeyresults.map(data => data.todo_id);
      let todos = await Todo.knex().whereIn('id', todo_ids);
      let krData = {};
      keyresults.forEach((data, index) => {
        data.todos = [];
        krData[index] = data;
        todoKeyresults.forEach(data => {
          if (keyresults[index].id == data.keyresult_id) {
            let todoId = data.todo_id;
            todos.forEach(data => {
              if (todoId == data.id) {
                krData[index].todos.push(data)
              }
            })
          }
        })
      })
      ctx.body = ({
        code: 200,
        data: { objective, krData }
      })
    } catch (e) {
      console.log(e)
      ctx.body = ({
        code: 0,
        data: '请求错误'
      })
    }
  },
  update: async function (ctx, next) {
    try {
      let id = ctx.params.id;
      let finished_time = new Date();
      let status = ctx.request.body.status;
      let state = status ? 0 : 1;
      await Objective.update(id, { status: state, finished_time });
      ctx.body = ({
        code: 200,
        message: '修改成功'
      })
    } catch (e) {
      ctx.body = ({
        code: 0,
        message: '服务器错误'
      })
    }
  },
  detailUpdate: async function (ctx, next) {
    try {
      let id = ctx.params.id;
      let finished_time = new Date();
      let status = ctx.request.body.status;
      let state = status ? 0 : 1;
      await Keyresult.update(id, { status: state, finished_time });
      ctx.body = ({
        code: 200,
        message: '修改成功'
      })
    } catch (e) {
      ctx.body = ({
        code: 0,
        message: '服务器错误'
      })
    }
  },
  detailDelete: async function (ctx, next) {
    console.log(132)
    try {
      let id = ctx.params.id;
      console.log(id)
      await Keyresult.delete(id);
      await todoKeyresult.select({ keyresult_id: id }).del();
      ctx.body = ({
        code: 200,
        message: '删除成功'
      })
    } catch (e) {
      ctx.body = ({
        code: 0,
        message: '服务器错误'
      })
    }
  }
}

module.exports = okrList