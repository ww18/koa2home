'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _indexController = require('./indexController');

var _indexController2 = _interopRequireDefault(_indexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initController = {
    init: function init(app, router) {

        //路由
        router.get('/', _indexController2.default.index());

        router.get('/scheduleBest', _indexController2.default.scheduleBest());
        router.get('/getBest', _indexController2.default.best());
        router.get('/getNewest', _indexController2.default.newest());
        //地址
        router.get('/index/update', _indexController2.default.update());
    }
}; /**
    * Created by ww on 2018/4/13.
    */
exports.default = initController;