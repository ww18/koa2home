'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

var _register = require('babel-core/register');

var _register2 = _interopRequireDefault(_register);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _initController = require('./controller/initController');

var _initController2 = _interopRequireDefault(_initController);

var _indexmodel = require('./model/indexmodel');

var _indexmodel2 = _interopRequireDefault(_indexmodel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var router = new _koaRouter2.default();

_initController2.default.init(app, router);

app.use((0, _koaStatic2.default)(_config2.default.get('staticDir')));
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
    root: _config2.default.get('viewDir'),
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody: false
}));
app.use(router.routes(), router.allowedMethods());

var rule = new _nodeSchedule2.default.RecurrenceRule();
rule.dayOfWeek = [1, 2, 3, 4, 5];
rule.hour = 1;
rule.minute = 0;
var indexmodel = new _indexmodel2.default();
_nodeSchedule2.default.scheduleJob(rule, function () {
    indexmodel.scheduleBest();
});

app.listen(_config2.default.get('port'));