# git 分支

## 2、1相关命令：新建、删除、合并分支，及查看分支列表

```git
    git branch    查看当前分支，会列出所有分支，并在当前分支前标*

    git branch -v    查看分支列表，及每个分支的最后一次提交

    --merged 与 --no-merged    两个参数，可以过滤分支列表中已经合并或尚未合并到当前分支的分支

    git branch dev   创建分支dev

    git checkout dev   切换到对应分支dev

    git checkout -b dev   创建，并且换到分支dev

    git branch -d dev    删除对应分支dev（已经合并的分支）

    git branch -D feature    强制删除分支（无论是否合并）

    git merge dev    合并指定分支（dev，合并后不改变）到当前分支master（任意分支，合并后拥有dev分支的更新）

    git log --graph --pretty=oneline --abbrev-commit  查看分支历史 git log
```

新建分支dev，并且换到分支后，我们可以在分支上正常提交（commit）,合并到master主分支（merge）之前，dev分支上的修改不会体现到master分支上