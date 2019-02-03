"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mutation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _authenticate = require("../utils/authenticate");

var _hashPassword = require("../utils/hashPassword");

var _hashPassword2 = _interopRequireDefault(_hashPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Mutation = {
  login: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, _ref2, info) {
      var data = _ref.data;
      var prisma = _ref2.prisma;
      var user, isMatchedPassword;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return prisma.query.user({ where: { email: data.email } });

            case 2:
              user = _context.sent;

              if (user) {
                _context.next = 5;
                break;
              }

              throw new Error("User not found");

            case 5:
              _context.next = 7;
              return _bcryptjs2.default.compare(data.password, user.password);

            case 7:
              isMatchedPassword = _context.sent;

              if (isMatchedPassword) {
                _context.next = 10;
                break;
              }

              throw new Error("Wrong password");

            case 10:
              return _context.abrupt("return", {
                user: user,
                token: (0, _authenticate.generateToken)({ userId: user.id })
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function login(_x, _x2, _x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return login;
  }(),
  createUser: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, _ref4, _ref5, info) {
      var data = _ref4.data;
      var prisma = _ref5.prisma;
      var hashedPassword, user, token;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _hashPassword2.default)(password);

            case 2:
              hashedPassword = _context2.sent;
              _context2.next = 5;
              return prisma.mutation.createUser({
                data: _extends({}, data, {
                  password: hashedPassword
                })
              });

            case 5:
              user = _context2.sent;
              token = (0, _authenticate.generateToken)({ userId: user.id });
              return _context2.abrupt("return", {
                user: user,
                token: token
              });

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createUser(_x5, _x6, _x7, _x8) {
      return _ref6.apply(this, arguments);
    }

    return createUser;
  }(),
  deleteUser: function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, agrs, _ref7, info) {
      var prisma = _ref7.prisma;
      var userId;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userId = (0, _authenticate.getUserId)(request);
              return _context3.abrupt("return", prisma.mutation.deleteUser({
                where: {
                  id: userId
                }
              }, info));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function deleteUser(_x9, _x10, _x11, _x12) {
      return _ref8.apply(this, arguments);
    }

    return deleteUser;
  }(),
  updateUser: function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, _ref9, _ref10, info) {
      var data = _ref9.data;
      var prisma = _ref10.prisma,
          request = _ref10.request;
      var userId, hashedPassword;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              userId = (0, _authenticate.getUserId)(request);

              if (!(typeof data.password === "string")) {
                _context4.next = 6;
                break;
              }

              _context4.next = 4;
              return (0, _hashPassword2.default)(data.password);

            case 4:
              hashedPassword = _context4.sent;

              data.password = hashedPassword;

            case 6:
              return _context4.abrupt("return", prisma.mutation.updateUser({
                data: data,
                where: {
                  id: userId
                }
              }, info));

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function updateUser(_x13, _x14, _x15, _x16) {
      return _ref11.apply(this, arguments);
    }

    return updateUser;
  }(),
  createPost: function createPost(parent, _ref12, _ref13, info) {
    var data = _ref12.data;
    var prisma = _ref13.prisma,
        request = _ref13.request;

    var userId = (0, _authenticate.getUserId)(request);
    return prisma.mutation.createPost({
      data: _extends({}, data, {
        author: {
          connect: {
            id: userId
          }
        }
      })
    }, info);
  },
  updatePost: function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parent, _ref14, _ref15, info) {
      var id = _ref14.id,
          data = _ref14.data;
      var prisma = _ref15.prisma,
          request = _ref15.request;
      var userId, postExists, isPublishedPost;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              userId = (0, _authenticate.getUserId)(request);
              _context5.next = 3;
              return prisma.exists.Post({
                id: id,
                author: {
                  id: userId
                }
              });

            case 3:
              postExists = _context5.sent;
              _context5.next = 6;
              return prisma.exists.Post({
                id: id,
                published: true
              });

            case 6:
              isPublishedPost = _context5.sent;

              if (postExists) {
                _context5.next = 9;
                break;
              }

              throw new Error("Unable to update post");

            case 9:
              if (!(isPublishedPost && !data.published)) {
                _context5.next = 12;
                break;
              }

              _context5.next = 12;
              return prisma.mutation.deleteManyComments({ where: { post: { id: id } } });

            case 12:
              return _context5.abrupt("return", prisma.mutation.updatePost({
                data: {
                  title: data.title,
                  body: data.body,
                  published: data.published
                },
                where: { id: id }
              }, info));

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function updatePost(_x17, _x18, _x19, _x20) {
      return _ref16.apply(this, arguments);
    }

    return updatePost;
  }(),
  deletePost: function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, agrs, _ref17, info) {
      var prisma = _ref17.prisma,
          request = _ref17.request;
      var userId, postExists;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              userId = (0, _authenticate.getUserId)(request);
              _context6.next = 3;
              return prisma.exists.Post({
                id: agrs.id,
                author: {
                  id: userId
                }
              });

            case 3:
              postExists = _context6.sent;

              if (postExists) {
                _context6.next = 6;
                break;
              }

              throw new Error("Post not found");

            case 6:
              return _context6.abrupt("return", prisma.mutation.deletePost({ where: { id: agrs.id } }, info));

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function deletePost(_x21, _x22, _x23, _x24) {
      return _ref18.apply(this, arguments);
    }

    return deletePost;
  }(),
  createComment: function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(parent, agrs, _ref19, info) {
      var prisma = _ref19.prisma,
          request = _ref19.request;
      var userId, postExists;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              userId = (0, _authenticate.getUserId)(request);
              _context7.next = 3;
              return prisma.exists.Post({
                id: agrs.data.post,
                published: true
              });

            case 3:
              postExists = _context7.sent;

              if (postExists) {
                _context7.next = 6;
                break;
              }

              throw new Error("Post not found");

            case 6:
              return _context7.abrupt("return", prisma.mutation.createComment({
                data: {
                  text: agrs.data.text,
                  author: {
                    connect: {
                      id: userId
                    }
                  },
                  post: {
                    connect: {
                      id: agrs.data.post
                    }
                  }
                }
              }, info));

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function createComment(_x25, _x26, _x27, _x28) {
      return _ref20.apply(this, arguments);
    }

    return createComment;
  }(),
  updateComment: function () {
    var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(parent, _ref21, _ref22, info) {
      var id = _ref21.id,
          data = _ref21.data;
      var prisma = _ref22.prisma,
          request = _ref22.request;
      var userId, commentExists;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              userId = (0, _authenticate.getUserId)(request);
              _context8.next = 3;
              return prisma.exists.Comment({
                id: id,
                author: {
                  id: userId
                }
              });

            case 3:
              commentExists = _context8.sent;

              if (commentExists) {
                _context8.next = 6;
                break;
              }

              throw new Error("Unable to update comment!");

            case 6:
              return _context8.abrupt("return", prisma.mutation.updateComment({
                data: { text: data.text },
                where: { id: id }
              }, info));

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function updateComment(_x29, _x30, _x31, _x32) {
      return _ref23.apply(this, arguments);
    }

    return updateComment;
  }(),
  deleteComment: function () {
    var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(parent, _ref24, _ref25, info) {
      var id = _ref24.id;
      var prisma = _ref25.prisma,
          request = _ref25.request;
      var userId, commentExists;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              userId = (0, _authenticate.getUserId)(request);
              _context9.next = 3;
              return prisma.exists.Comment({
                id: id,
                author: {
                  id: userId
                }
              });

            case 3:
              commentExists = _context9.sent;

              if (commentExists) {
                _context9.next = 6;
                break;
              }

              throw new Error("Unable to delete comment!");

            case 6:
              return _context9.abrupt("return", prisma.mutation.deleteComment({
                where: { id: id }
              }, info));

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function deleteComment(_x33, _x34, _x35, _x36) {
      return _ref26.apply(this, arguments);
    }

    return deleteComment;
  }()
};

exports.Mutation = Mutation;