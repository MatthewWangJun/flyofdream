/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
  .factory('UploadService', function ($http, $q,$resource, Upload) {
    var qiniuBaseLinkUrl = 'http://7xpscc.com1.z0.glb.clouddn.com/';
    var qiniuUploadUrl = 'http://upload.qiniu.com/';
    var polyvUploadUrl=" http://v.polyv.net/uc/services/rest?method=uploadfile"
    return {

      /**
       * 上传文件到七牛云
       * @param file
       */
      fileUploadToQiNiu:function (file) {
        var deferred = $q.defer();
        var token;
        this.getQiNiuToken().$promise
          .then(function (res) {
            token = res.token;
            Upload.upload({
              url: qiniuUploadUrl,
              data: {file: file, token: token, name: file.name, key: file.name}
            }).then(function (res) {
              //var data={url:}
              res.data.url = qiniuBaseLinkUrl + res.data.key;
              deferred.resolve(res);
            }, function (err) {
              deferred.reject(err);
            }, function (evt) {
              deferred.notify(evt);
            });

          })

        return deferred.promise;
      },
        /**
         * 上传文件到七牛云
         * @param blob
         */
        blobUploadToQiNiu:function (blob) {
            var deferred = $q.defer();
            var token;
            var fileName=new Date().getTime();
            this.getQiNiuToken().$promise
                .then(function (res) {
                    token = res.token;
                    Upload.upload({
                        url: qiniuUploadUrl,
                        data: {file: blob, token: token, name: fileName, key: fileName}
                    }).then(function (res) {
                        //var data={url:}
                        res.data.url = qiniuBaseLinkUrl + res.data.key;
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    }, function (evt) {
                        deferred.notify(evt);
                    });

                })

            return deferred.promise;
        },
      /**
       * 上传文件到保利威视
       * 若需要secretkey 签名认证 需要sha1 加密 输入参数和secretkey 作为sign 的请求参数。
       * 例如：var SHA1=new Hashes.SHA1;
       *  var sign=SHA1.hex("请求参数"+secretkey)
       * @param file
       * @param JSONRPC 字符串类型
       */
      fileUploadToPolyv:function (file,JSONRPC) {
        var deferred = $q.defer();
        var token;
        this.getPolyvToken().$promise
          .then(function (res) {
            token = res.token;
            Upload.upload({
              headers:{"Content-Type":'application/x-www-form-urlencoded'},

              url: polyvUploadUrl,
              data: {Filedata: file, writetoken: token, JSONRPC:JSONRPC}
            }).then(function (res) {

              deferred.resolve(res);
            }, function (err) {
              deferred.reject(err);
            }, function (evt) {
              deferred.notify(evt);
            });

          })

        return deferred.promise;
      },
      /**
       * 获取七牛upToken
       */
      getQiNiuToken: function () {
        var qiniuToken = $resource('api/upload/getQiNiuToken');
        return qiniuToken.get();
      },
      /**
       * 获取保利威视Token
       */
      getPolyvToken: function () {
        var qiniuToken = $resource('api/upload/getPolyvToken');
        return qiniuToken.get();
      }
    }

  });
