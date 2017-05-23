var myApp = angular.module("uploaderApp", [])



myApp.component("uploader", {
  bindings: {

  },
  template: '<div class="container-fluid"><h1 class="page-header text-center">Uploaded videos!</h1><div class="row"><div ng-repeat="video in vm.allVideos" class="row-buffer col-md-offset-3 col-md-6"><div class="{{ video }}" style="width:640px;height:360px;">&nbsp;</div></div></div><div class="row"><div class="text-center col-md-offset-4 col-md-4"><h4>Upload a new video:</h4><div style="height:0px;overflow:hidden"><input id="fileupload" type="file" name="video-upload"></input></div><button class="btn btn-info" type="button" ng-click="vm.videoUpload()">Choose file</button></div></div><div class="row row-buffer"><div class="progress"><div class="progress-bar" role="progressbar" aria-valuemin="0" style="width: 0%;"></div></div></div></div>',
  controller: function($scope) {

    var vm = this;

    vm.allVideos = [];

    vm.videoUpload = function() {
        $("#fileupload").click().fileupload({
            dataType: 'json',
            url: 'https://upload.wistia.com',
            formData: {api_password: "583b33c15d2237a54023d3493deab9ff3595e392731ca45ffb8cdb7de219ae2d"},
            done: function (e, data) {
              alert("Video successfully uploaded!");
              vm.allVideos.push("wistia_embed wistia_async_" + data.result.hashed_id);
              $scope.$apply();
            },
            fail: function (e, data) {
              alert("Uh-oh! Upload unsuccessful!");
            },
            progressall: function (e, data) {
              var progress = parseInt(data.loaded / data.total * 100, 10);
              $('.progress .progress-bar').css(
                'width',
                progress + '%'
              );
            }
        });
      }
  },
  controllerAs: 'vm'

});
