const Controller =
  require('app/http/controllers/api/Controller');
const User = require('app/models/User');
const bcrypt = require('bcrypt');

class UserController extends Controller {

  async index(req, res, next) {
    try {
      let page = req.query.page || 1;
      let users = await User.paginate({}, {
        select: {},
        page,
        sort: {createdAt: -1},
        limit: 6
      });

      res.json({
        data: this.filterUsersData(users),
        status: 'success'
      });
    } catch (err) {
      this.failed(err.message, res)
    }
  }

  async single(req, res) {
    try {
      if (!await this.isMongoId(req.params.id, res)) return;

      let user =
        await User.findById(req.params.id);

      if (!user) {
        return this.failed(
          'چنین کاربری یافت نشد',
          res, 404);
      }

      res.json({
        data: this.userData(user),
        status: 'success'
      });
    } catch (err) {
      this.failed(err.message, res)
    }
  }

  async store(req, res) {
    try {
      if (!await this.validationData(req, res)) return;

      let {name, email, password} = req.body;

      let newUser =
        new User({
          name, email
        });

      newUser.$set({
        password: newUser.hashPassword(password)
      });

      await newUser.save();

      res.json({
        data: 'کاربر با موفقیت ایجاد شد',
        status: 'success',

      });
    } catch (err) {
      this.failed(err.message, res);
    }
  }

  async update(req, res) {
    try {
      if (!await this.isMongoId(req.params.id, res)) return;
      if (!await this.validationData(req, res)) return;

      let user =
        await User.findById(req.params.id);

      if (!user) {
        return this.failed(
          'چنین کاربری یافت نشد',
          res, 404);
      }

      let {name, email, password} = req.body;

      console.log(req.body);

      user.set({
        name: name,
        email: email,
        password: user.hashPassword(password)
      });

      user.save();

      res.json({
        data: 'بروز رسانی کاربر با موفقیت انجام شد',
        status: 'success'
      });
    } catch (err) {
      this.failed(err.message, res);
    }
  }

  async destroy(req, res) {
    try {
      if (!await this.isMongoId(req.params.id, res)) return;


      let user =
        await User.findById(req.params.id).exec();

      if (!user) {
        return this.failed(
          'چنین کاربری یافت نشد',
          res, 404);
      }

      await user.remove();

      res.json({
        data: 'کاربر با موفقیت حذف شد',
        status: 'success'
      });
    } catch (err) {
      this.failed(err.message, res);
    }
  }

  filterUsersData(users) {
    return {
      ...users,
      docs: users.docs.map(user => {
        return this.userData(user)
      })
    };
  }

  userData(user) {
    return {
      id: user.id,
      admin: user.admin,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
  }
}

module.exports = new UserController();