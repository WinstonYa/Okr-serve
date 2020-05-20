const TodoKeyresult = require('../models/todo_keyresult');
const Keyresult = require('../models/keyresult');
const Objective = require('../models/objective');

const todoKeyresultController = {
  keyresult: async function (ctx, next) {
    let todo_id = ctx.query.todoId;
    let user_id = ctx.query.user_id;
    let params = {
      user_id: user_id,
      status: 0
    }

    let objectives = await Objective.select(params);
    let objective_ids = objectives.map(data => data.id);
    console.log(objective_ids)
    let keyresults = await Keyresult.knex().whereIn('objective_id', objective_ids);
    let todoKeyresults = await TodoKeyresult.select({ todo_id });
    let keyresult_ids = todoKeyresults.map(data => data.keyresult_id)

    let okr = {};
    objectives.forEach(item => {
      item.keyresults = [],
        okr[item.id] = item
    })

    keyresults.forEach(item => {
      if (item.objective_id == okr[item.objective_id].id) {
        okr[item.objective_id].keyresults.push(item)
        item.active = keyresult_ids.includes(item.id)
      }
    })
    ctx.body = ({
      code: 200,
      data: okr
    })
  },
  insert: async function (ctx, next) {
    let todo_id = ctx.request.body.id;
    let keyresult_id = ctx.request.body.krId;
    if (!todo_id || !keyresult_id) {
      ctx.body = ({
        code: 0,
        message: '缺少参数'
      })
      return
    }
    try {
      await TodoKeyresult.insert({ todo_id, keyresult_id });
      ctx.body = ({
        code: 200,
        message: '绑定成功'
      })
    } catch (e) {
      console.log(e)
    }
  },
  delete: async function (ctx, next) {
    try {
      let todo_id = ctx.request.body.id;
      let keyresult_id = ctx.request.body.krId;
      await TodoKeyresult.select({ todo_id, keyresult_id }).del();
      ctx.body = {
        code: 200,
        message: '删除成功！'
      }
    } catch (e) {
      ctx.body = ({
        code: 0,
        message: e
      })
    }
  }
}

module.exports = todoKeyresultController