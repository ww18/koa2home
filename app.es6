import Koa from 'koa';

import Router from 'koa-router';
import render from 'koa-swig';
import co from 'co';
import publicFile from 'koa-static';
import path from 'path';

import schedule from 'node-schedule';
import babel_po from 'babel-polyfill';
import babel_co from 'babel-core/register';

import CONFIG from './config/config';

import controllerInit from './controller/initController';
import Indexmodel from './model/indexmodel';

const app = new Koa();
const router = new Router();

controllerInit.init(app, router);

app.use(publicFile(CONFIG.get('staticDir')));
app.context.render = co.wrap(render({
    root: CONFIG.get('viewDir'),
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody: false
}))
app.use(router.routes(),router.allowedMethods());

var rule     = new schedule.RecurrenceRule();
rule.dayOfWeek = [1,2,3,4,5];
rule.hour = 1;
rule.minute = 0;
var indexmodel = new Indexmodel();
schedule.scheduleJob(rule, function(){
    indexmodel.scheduleBest();
});


app.listen(CONFIG.get('port'));