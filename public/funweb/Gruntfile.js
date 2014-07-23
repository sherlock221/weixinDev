module.exports = function(grunt) {

    //读取package.json
    var pkg = grunt.file.readJSON("package.json");

    //初始化Grunt
    grunt.initConfig({

        pkg :pkg,

        /** 合并 **/
        concat  : {
            /**
             * css进行打包 (全部)
             */
            commonCss : {
                src : ['src/css/*.css'],
                dest : 'build/css/all.debug.css'
            },

            /**
             * 合并工具类
             */
            commonJS : {
                src : "src/js/common/*.js",
                dest : "build/js/common/common-debug.js"
            }
        },

        /**  监听文件夹并且执行任务 **/
        watch : {
            css : {
                files : ['src/css/*.css'],
                tasks : ["concat:commonCss","cssmin:commonCss"],
                options : {
                    //默认 35729端口
                    livereload : true
                }
            },
            service : {
                files : ['src/js/service/*.js'],
                tasks : ["uglify:serviceJS"],
                options : {
                    //默认 35729端口
                    livereload : true
                }
            }
        },
        /** 压缩j **/
        uglify : {
            commonJS : {
                src : "build/js/common/common-debug.js",
                dest : "build/js/common/common-main.js"
            },

            serviceJS : {
                files: {
                    'build/js/service/dishes.main.js': ['src/js/service/dishes.js'],
                    'build/js/service/restaurantlist.main.js': ['src/js/service/restaurantlist.js'],
                    'build/js/service/orderInfo.main.js': ['src/js/service/orderInfo.js'],
                    'build/js/service/shoppingcar.main.js': ['src/js/service/shoppingcar.js'],
                    'build/js/service/selectArea.main.js': ['src/js/service/selectArea.js'],
                    'build/js/service/myorder.main.js': ['src/js/service/myorder.js']
                }
            }
        },

        /** 压缩css **/
        cssmin : {
            options : {
            },
            commonCss : {
                src : 'build/css/all-debug.css',
                dest : 'build/css/all-main.css'
            }
        },

        /** js代码检查  **/
        jshint: {
            src : "build/js/common/common-debug.js"
        }


    });

    //合并文件
    grunt.loadNpmTasks('grunt-contrib-concat');
    //压缩js
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //js检查
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //压缩css
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //watch 监听
    grunt.loadNpmTasks('grunt-contrib-watch');




    //打包压缩  公共js类
    grunt.registerTask('js', ["concat:commonJS","uglify:commonJS"]);
    //压缩业务js
    grunt.registerTask('service', ["uglify:serviceJS"]);
    //合并全部css并压缩
    grunt.registerTask('css', ["concat:commonCss","cssmin:commonCss"]);


};