'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _indexmodel = require('../model/indexmodel');

var _indexmodel2 = _interopRequireDefault(_indexmodel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by ww on 2018/4/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var indexController = {
    index: function index() {
        var _this = this;

        return function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
                var data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                data = ctx.query;
                                _context.next = 3;
                                return ctx.render('index.html', data);

                            case 3:
                                ctx.body = _context.sent;

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }();
    },
    scheduleBest: function scheduleBest() {
        var _this2 = this;

        return function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
                var data, indexM, req;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                data = ctx.query;
                                indexM = new _indexmodel2.default(ctx);
                                _context2.next = 4;
                                return indexM.scheduleBest(data);

                            case 4:
                                req = _context2.sent;

                                ctx.body = req;

                                //ctx.body = ctx.query.username + ctx.query.num;

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2);
            }));

            return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        }();
    },
    best: function best() {
        var _this3 = this;

        return function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx, next) {
                var data, indexM, req;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                data = ctx.query;
                                indexM = new _indexmodel2.default(ctx);
                                _context3.next = 4;
                                return indexM.best(data);

                            case 4:
                                req = _context3.sent;

                                ctx.body = req;

                                //ctx.body = ctx.query.username + ctx.query.num;

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this3);
            }));

            return function (_x5, _x6) {
                return _ref3.apply(this, arguments);
            };
        }();
    },
    newest: function newest() {
        var _this4 = this;

        return function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx, next) {
                var data, indexM, req;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                data = ctx.query;
                                indexM = new _indexmodel2.default(ctx);
                                _context4.next = 4;
                                return indexM.updateNum(data);

                            case 4:
                                req = _context4.sent;

                                ctx.body = req;

                                //ctx.body = ctx.query.username + ctx.query.num;

                            case 6:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this4);
            }));

            return function (_x7, _x8) {
                return _ref4.apply(this, arguments);
            };
        }();
    },
    update: function update() {
        var _this5 = this;

        return function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx, next) {
                var data, indexM, req;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                data = ctx.query;
                                indexM = new _indexmodel2.default(ctx);
                                _context5.next = 4;
                                return indexM.updateNum(data);

                            case 4:
                                req = _context5.sent;

                                //ctx.body = req;
                                if (req) {
                                    //console.log(data);
                                    ctx.redirect('/index/index?username=' + data.username + '&num=' + data.num);
                                    //ctx.body = req;
                                }
                                //ctx.body = ctx.query.username + ctx.query.num;

                            case 6:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, _this5);
            }));

            return function (_x9, _x10) {
                return _ref5.apply(this, arguments);
            };
        }();
    }
};
exports.default = indexController;