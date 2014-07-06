// Repo.js

// TODO: Experiment with child_process.exec()
// Git-wrapper is funky.
var Git = require('git-wrapper');
var url = require('url');
var debug = require('debug')('repo');

module.exports = Repo;

// Pass in the settings to get a new Repo object
function Repo(obj) {
  for (var key in obj) {
    this[key] = obj[key];
  }
  // Attach the git wrapper to a copied object
  var options = {
    'work-tree': this.worktree,
    'git-dir': this.gitdir
  };
  this.git = new Git(options);
}

Repo.prototype.clone = function (cb) {
  // TODO Audit how safe this is....
  // Caution!  Passwords!
  // 
  debug('Cloning to ' + this.worktree);
  var repoUrl = url.parse(this.repo);
  repoUrl.auth = 
    process.env.USERNAME + ':' + process.env.PASSWORD;
  this.git.exec('clone',
                {},   
                [url.format(repoUrl), this.worktree], 
                cb);
}

Repo.prototype.pull = function(cb) {
  debug('Pulling ' + this.worktree);
  this.git.exec('pull', this.remoteBranch, cb);
}

Repo.prototype.init = function(cb) {
  fs.exists(this.worktree, function(exists) {
    if (exists === true) {
      debug(this.repo + ' aready cloned.  Pulling.');
      this.git.pull(cb);
    }, else {
      this.git.clone(cb);
    }
  });
}

Repo.prototype.add = function(folders, cb) {
  // folders to commit:
  // folders = ['media', '_posts/ownyourgram']
  this.git.exec('add', {A: true}, args, cb);
};

Repo.prototype.commit = function (comMsg, cb) {
  // comMsg: commit message
  // pitfall: "'Ownyourgram posted a file'"
  // The string must be delimited
  this.git.exec('commit', {m: true}, comMsg, cb)
}

Repo.prototype.push = function(first_argument) {
  this.git.exec('push', this.remoteBranch, cb);
};