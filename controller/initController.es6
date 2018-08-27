/**
 * Created by ww on 2018/4/13.
 */
import indexController from './indexController';
var initController = {
    init(app, router){


        //路由
        router.get('/', indexController.index());

        router.get('/scheduleBest', indexController.scheduleBest());
        router.get('/getBest', indexController.best());
        router.get('/getNewest', indexController.newest());
        //地址
        router.get('/index/update', indexController.update());
    }
}
export default initController;