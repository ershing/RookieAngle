
/**
 * 此文件只是作为对上传数据做处理的模块，并不包含建立服务器及路由跳转
 */

var express = require('express');
var fs = require('fs');
var path = require('path');
var apibase = require('api-base');
var dirConfig = require('./upload_config.json');//文件配置,此处需要自行配置
var mkdirp = require('mkdirp');

//解析 multipart/form-data
var Busboy = require('busboy');

//生成文件标识符的函数
function generateGuid() {
    return 'xxxxxxxx-xxxx-3xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

//文件上传
function upload(req, res) {
    //获取参数
    var fileName;
    var fileSize;
    var fileType;
    var start = 0;
    var block = 0;
    var count = 0;
    var total = 0;
    var inputFile;
    var writtenBytes;
    var percentage;
    var guid;
    var uploader_id;
    //当日文件夹名称
    var date = new Date();
    var fileDir = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    //存取文件路径
    var targetFileDirPath = path.join(dirConfig.rootDir, dirConfig.dirName, fileDir);
    //先判断文件夹是否存在
    try {
        if (!fs.existsSync(targetFileDirPath)) {
            mkdirp.sync(targetFileDirPath);
        }
    }
    catch (e) {
        console.error(e);
    }

    var busboy = new Busboy({ headers: req.headers, encoding: 'utf8' });

    //监听file事件
    busboy.on('file', function (fieldname, blob, filename, encoding, mimetype) {
        log('info', '/base_data_service/attachment/upload,file', '开始接受文件', filename);

        //创建缓存区读入数据
        var buffers = [];

        //以流形式写入
        blob.on('data', function (data) {
            buffers.push(data);
        });

        blob.on('end', function () {
            //先将收到数据拼接为一块
            var buffer = Buffer.concat(buffers);

            console.log('count:', count, 'times', 'total:', total, 'times');

            //设置文件路径
            var file_arr = fileName.split('.');
            var suffix = file_arr[file_arr.length - 1];
            var myTarget = path.join(targetFileDirPath, guid + "." + suffix);

            try {
                //开始追加写入文件
                fs.writeFileSync(myTarget, buffer, {
                    flag: 'a',
                    encoding: 'binary'
                });
            } catch (e) {
                console.log(e);
            }

            //写入完成，反馈信息
            if (count < total) {
                var hasWrittenBytes = count * block;
            }
            else {
                hasWrittenBytes = fileLoaded;
            }
            percentage = hasWrittenBytes / fileSize;
            console.log('已经写入', (percentage * 100).toFixed(1) + '%', ',写入了', hasWrittenBytes, 'bytes');
            console.log('------------------------------------------');
            if (percentage < 1) {
                var resObj = {
                    guid: guid,
                    fileName: fileName,
                    fileLoaded: fileLoaded,
                    writingPercentage: (percentage * 100).toFixed(1) + '%',
                    hasWrittenBytes: hasWrittenBytes
                }
                res.send(resObj);
            }
            if (percentage >= 1) {

                var resObj = {
                    guid: guid,
                    fileName: fileName,
                    fileLoaded: fileLoaded,
                    writingPercentage: (percentage * 100).toFixed(1) + '%',
                    hasWrittenBytes: hasWrittenBytes
                };
                var rowInfo = {
                    attament_id: generateGuid(),
                    attament_title: fileName,
                    attament_path: path.join(targetFileDirPath, guid + "." + suffix),
                    attament_ext: fileType,
                    uploader_id: uploader_id,
                    web_url: path.format({
                        root: '/ignored',
                        dir: fileDir,
                        base: guid + "." + suffix
                    }).replace(/\\/g, '/')
                };
                res.send(rowInfo);
            }
            return;
        });

    });

    //监听field
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {


        if (fieldname === 'uploader_id') {
            uploader_id = Number(val);
        }
        if (fieldname === 'total') {
            total = Number(val);
        }
        if (fieldname === 'guid') {
            guid = val;
        }
        if (fieldname === 'block') {
            block = Number(val);
        }
        if (fieldname === 'count') {
            count = Number(val);
            //生成guid
            if (count === 1) {
                guid = generateGuid();
            }
        }
        if (fieldname === 'fileSize') {
            fileSize = Number(val);
            console.log('fileSize:', fileSize, 'bytes');
        }
        if (fieldname === 'fileName') {
            fileName = val;
        }
        if (fieldname === 'fileType') {
            fileType = val;
        }
        if (fieldname === 'fileLoaded') {
            fileLoaded = Number(val);
            console.log('fileLoaded:', val, 'bytes');
            // 根据传入次数，block大小，来判断写入的位置
            if (total !== count) {
                start = fileLoaded - block;
            }
            else {
                start = Math.floor(fileLoaded / block) * block;
            }
            console.log('start:', start, 'bytes');
        }


    });


    //接收完成的回调
    busboy.on('finish', function () {
        return;
    });

    req.pipe(busboy);
}


module.exports = upload;