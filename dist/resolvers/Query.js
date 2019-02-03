"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Query = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _authenticate = require("../utils/authenticate");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = {
  me: function me(parent, args, _ref, info) {
    var prisma = _ref.prisma,
        request = _ref.request;

    var userId = (0, _authenticate.getUserId)(request);
    return prisma.query.user({ where: { id: userId } }, info);
  },
  posts: function posts(parent, args, _ref2, info) {
    var prisma = _ref2.prisma;

    var opAgrs = {
      where: {
        published: true
      },
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    if (args.query) {
      opAgrs.where = _extends({}, opAgrs.where, {
        OR: [{ title_contains: args.query }, { body_contains: args.query }]
      });
    }
    return prisma.query.posts(opAgrs, info);
  },
  myPost: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref3, info) {
      var prisma = _ref3.prisma,
          request = _ref3.request;
      var userId, opAgrs;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userId = (0, _authenticate.getUserId)(request);
              opAgrs = {
                where: {
                  author: {
                    id: userId
                  }
                },
                first: args.first,
                skip: args.skip,
                after: agrs.after
              };


              if (args.query) {
                opAgrs.where.OR = [{ title_contains: args.query }, { body_contains: args.query }];
              }

              return _context.abrupt("return", prisma.query.posts(opAgrs, info));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function myPost(_x, _x2, _x3, _x4) {
      return _ref4.apply(this, arguments);
    }

    return myPost;
  }(),
  post: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, agrs, _ref5, info) {
      var prisma = _ref5.prisma,
          request = _ref5.request;
      var userId, posts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = (0, _authenticate.getUserId)(request, false);
              _context2.next = 3;
              return prisma.query.posts({
                where: {
                  id: agrs.id,
                  OR: [{
                    published: true
                  }, {
                    author: {
                      id: userId
                    }
                  }]
                }
              }, info);

            case 3:
              posts = _context2.sent;

              if (!(posts.length === 0)) {
                _context2.next = 6;
                break;
              }

              throw new Error("Post not found");

            case 6:
              return _context2.abrupt("return", posts[0]);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function post(_x5, _x6, _x7, _x8) {
      return _ref6.apply(this, arguments);
    }

    return post;
  }(),
  users: function users(parent, args, _ref7, info) {
    var prisma = _ref7.prisma;

    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after
    };
    if (args.query) {
      opArgs.where = {
        OR: [{ name_contains: args.query }, { email_contains: args.query }]
      };
    }
    return prisma.query.users(opArgs, info);
  },
  comments: function comments(parent, args, ctx, info) {
    return prisma.query.comments(null, info);
  }
};

exports.Query = Query;