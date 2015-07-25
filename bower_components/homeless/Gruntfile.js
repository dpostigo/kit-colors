'use strict';
var tasks = require('load-grunt-tasks');
var time = require('time-grunt');
module.exports = function (grunt) {
  time(grunt);
  tasks(grunt);
  grunt.initConfig({
    bumpup: {
      files: ['package.json', 'bower.json']
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      src: ['**/*.js', '!node_modules/**/*.js']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: ['**/*.js', '**/*.json', '!node_modules/**/*.js', '!node_modules/**/*.json']
    },
    concat: {
      options: {
        process: function(src, filepath) {
          return src.replace(/(^|\n)[ \t]*(@import\s+'.*'|@import\s+".*");?\s*/g, '\n$1');
        },
      },
      dist: {
        src: ['src/*/*.less','!src/*/*.test.less'],
        dest: 'dist/home.less'
      }
    },
    copy: {
      demo: {
        src: 'dist/*',
        dest: 'demo/js/',
        flatten: true,
        filter: 'isFile',
        expand: true
      }
    },
    less: {
      test: {
        files: {
          'tmp/test/for.test.css': 'src/for/for.test.less',
          'tmp/test/each.test.css': 'src/each/each.test.less',
          'tmp/test/if.test.css': 'src/if/if.test.less',
          'tmp/test/index.test.css': 'src/index/index.test.less',
          'tmp/test/repeat.test.css': 'src/repeat/repeat.test.less',
          'tmp/test/join.test.css': 'src/join/join.test.less',
        }
      },
    },
    watch: {
      less: {
        files: ['src/**/*.less'],
        tasks: ['less']
      }
    },
    module: {
      'check-repository': {
        options: {
          check: true
        }
      },
      'license-copyright': {
        options: {
          replace: true,
          line: 3
        },
        src: 'LICENSE'
      },
      'release-publish': {
        options: {
          release: true,
          publish: true
        }
      }
    }
  });
  grunt.registerTask('build', [
    'concat'
    ]);
  grunt.registerTask('dev', [
    'less'
    ]);
  grunt.registerTask('lint', [
    'jscs',
    'jshint'
    ]);
  grunt.registerTask('start', [
    'dev',
    'watch'
    ]);
  grunt.registerTask('publish', function (type) {
    grunt.task.run('build');
    grunt.task.run('module:check-repository');
    grunt.task.run('bumpup:' + type);
    grunt.task.run('module:license-copyright');
    grunt.task.run('module:release-publish');
  });
  grunt.registerTask('default', 'build');
};