/**
 * Created by ww on 2018/4/13.
 */
import rp from 'request-promise';
import fs from 'fs';
class IndexModel{
    constructor(ctx){
        this.ctx = ctx;
    }
    bestDataInit(phone){
        let i = {};
        i.phone = phone;
        i.strategyNum = Math.floor(Math.random()*300) + 200;  //200-500的随机数
        i.profile = Math.floor(Math.random()*2000000) + 2000000;  //盈利在200万到400万
        return i;
    }
    bestDataIncrease(i){
        i.strategyNum += Math.floor(Math.random()*4);  //0-3的随机数
        i.profile += Math.round(Math.random()*-50000) + 50000;  //盈利在-5万到5万
    }
    scheduleBest(){
        const options = {
            uri: 'https://pz.simuhao.com/api/strategy/best/list?agent_type=stock&agent=100',
            method: 'GET'
        };
        return new Promise((resolve, reject)=> {
            rp(options).then((result)=> {
                console.log(result);
                let resultNew = JSON.parse(result).data.list;

                var filename = "data/best.json";
                var resultOld = fs.readFileSync(filename, 'utf8');
                console.log(resultNew);
                if (!resultOld) { //如果结果为空，说明是第一次获取数据
                    resultOld = resultNew;
                    for (let i = 0; i < resultOld.length; i++) {
                        let phone = resultOld[i].phone;
                        resultOld[i] = this.bestDataInit(phone);
                    }
                } else {
                    resultOld = JSON.parse(resultOld);
                    //都查找一遍，如果有新的手机号则插入resultOld中，就是这样的话，json文件会越来越大，不过也不会大到哪里去
                    for (let i of resultNew) {
                        let flag = true;
                        let phone = i.phone;
                        for (let j of resultOld) {
                            if (phone == j.phone) {
                                flag = false;
                                break;
                            }
                        }
                        if (flag) {  //resultOld中不存在result中的手机号，则添加到resultOld中
                            resultOld.push(this.bestDataInit(phone))
                        }
                    }
                    //每天增加数值
                    for (let j of resultOld) {
                        this.bestDataIncrease(j);
                    }
                }
                //数据生成之后排序再存储
                resultOld.sort((first, second)=> {
                    return first.profile < second.profile;
                })
                //console.log(JSON.parse(result).data);
                fs.writeFileSync(filename, JSON.stringify(resultOld));
                resolve('修改成功');
            }).catch((err)=> {
                console.log(3);
                reject(err);
            })
        })
    }
    best(){
        return new Promise((resolve, reject)=>{

            var filename = "data/best.json";
            var result = JSON.parse(fs.readFileSync(filename));
            //fs.writeFileSync(filename, JSON.stringify(resultNew));
            if(result){
                resolve(result);
            }else{
                reject('');
            }

        })
    }

    updateNum(data){
        const options = {
            uri: 'http://support.com:8061/praise.php?username='+data.username + '&num='+data.num,
            method: 'GET'
        };

        return new Promise((resolve, reject)=>{
            console.log(options);
            rp(options).then(function(result){
                console.log(result);
                if(result){
                    resolve(result);
                }else{
                    reject('');
                }
            }).catch((err)=>{
                console.log(3);
                reject(err);
            })
        })
    }
}
export default IndexModel;