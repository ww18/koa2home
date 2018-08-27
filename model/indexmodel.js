'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ww on 2018/4/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IndexModel = function () {
    function IndexModel(ctx) {
        _classCallCheck(this, IndexModel);

        this.ctx = ctx;
    }

    _createClass(IndexModel, [{
        key: 'bestDataInit',
        value: function bestDataInit(phone) {
            var i = {};
            i.phone = phone;
            i.strategyNum = Math.floor(Math.random() * 300) + 200; //200-500的随机数
            i.profile = Math.floor(Math.random() * 2000000) + 2000000; //盈利在200万到400万
            return i;
        }
    }, {
        key: 'bestDataIncrease',
        value: function bestDataIncrease(i) {
            i.strategyNum += Math.floor(Math.random() * 4); //0-3的随机数
            i.profile += Math.round(Math.random() * -50000) + 50000; //盈利在-5万到5万
        }
    }, {
        key: 'scheduleBest',
        value: function scheduleBest() {
            var _this = this;

            var options = {
                uri: 'https://pz.simuhao.com/api/strategy/best/list?agent_type=stock&agent=100',
                method: 'GET'
            };
            return new Promise(function (resolve, reject) {
                (0, _requestPromise2.default)(options).then(function (result) {
                    console.log(result);
                    var resultNew = JSON.parse(result).data.list;

                    var filename = "data/best.json";
                    var resultOld = _fs2.default.readFileSync(filename, 'utf8');
                    console.log(resultNew);
                    if (!resultOld) {
                        //如果结果为空，说明是第一次获取数据
                        resultOld = resultNew;
                        for (var i = 0; i < resultOld.length; i++) {
                            var phone = resultOld[i].phone;
                            resultOld[i] = _this.bestDataInit(phone);
                        }
                    } else {
                        resultOld = JSON.parse(resultOld);
                        //都查找一遍，如果有新的手机号则插入resultOld中，就是这样的话，json文件会越来越大，不过也不会大到哪里去
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = resultNew[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var _i = _step.value;

                                var flag = true;
                                var _phone = _i.phone;
                                var _iteratorNormalCompletion3 = true;
                                var _didIteratorError3 = false;
                                var _iteratorError3 = undefined;

                                try {
                                    for (var _iterator3 = resultOld[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                        var _j = _step3.value;

                                        if (_phone == _j.phone) {
                                            flag = false;
                                            break;
                                        }
                                    }
                                } catch (err) {
                                    _didIteratorError3 = true;
                                    _iteratorError3 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                            _iterator3.return();
                                        }
                                    } finally {
                                        if (_didIteratorError3) {
                                            throw _iteratorError3;
                                        }
                                    }
                                }

                                if (flag) {
                                    //resultOld中不存在result中的手机号，则添加到resultOld中
                                    resultOld.push(_this.bestDataInit(_phone));
                                }
                            }
                            //每天增加数值
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = resultOld[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var j = _step2.value;

                                _this.bestDataIncrease(j);
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    }
                    //数据生成之后排序再存储
                    resultOld.sort(function (first, second) {
                        return first.profile < second.profile;
                    });
                    //console.log(JSON.parse(result).data);
                    _fs2.default.writeFileSync(filename, JSON.stringify(resultOld));
                    resolve('修改成功');
                }).catch(function (err) {
                    console.log(3);
                    reject(err);
                });
            });
        }
    }, {
        key: 'best',
        value: function best() {
            return new Promise(function (resolve, reject) {

                var filename = "data/best.json";
                var result = JSON.parse(_fs2.default.readFileSync(filename));
                //fs.writeFileSync(filename, JSON.stringify(resultNew));
                if (result) {
                    resolve(result);
                } else {
                    reject('');
                }
            });
        }
    }, {
        key: 'updateNum',
        value: function updateNum(data) {
            var options = {
                uri: 'http://support.com:8061/praise.php?username=' + data.username + '&num=' + data.num,
                method: 'GET'
            };

            return new Promise(function (resolve, reject) {
                console.log(options);
                (0, _requestPromise2.default)(options).then(function (result) {
                    console.log(result);
                    if (result) {
                        resolve(result);
                    } else {
                        reject('');
                    }
                }).catch(function (err) {
                    console.log(3);
                    reject(err);
                });
            });
        }
    }]);

    return IndexModel;
}();

exports.default = IndexModel;