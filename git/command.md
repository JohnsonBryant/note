# git 学习笔记

## 1、命令
#### 分支 ####
**1、相关命令**
```git
	git branch    查看当前分支，会列出所有分支，并在当前分支前标*
    git branch dev   创建分支dev
    git checkout dev   切换到对应分支dev
    git checkout -b dev   创建，并且换到分支dev
    git branch -d dev    删除对应分支dev（已经合并的分支）
    git branch -D feature    强制删除分支（无论是否合并）
    git merge dev    合并指定分支（dev，合并后不改变）到当前分支master（任意分支，合并后拥有dev分支的更新）
    git log --graph --pretty=oneline --abbrev-commit  查看分支历史 git log
```
新建分支dev，并且换到分支后，我们可以在分支上正常提交（commit）,合并到master主分支（merge）之前，dev分支上的修改不会体现到master分支上

- **解决合并branch 中的冲突**
	- 当git 无法自动合并时，必须先手动解决冲突的部分。解决冲突后，再提交，合并完成。
```javascript
Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容

<<<<<<< HEAD
Creating a new branch is quick & simple.
=======
Creating a new branch is quick AND simple.
>>>>>>> feature1
```
- **分支管理策略**
	- git merge --no-ff 参数  表示禁用Fast forward
	> 合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息
	
	>强制禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息 
- **bug 分支**
新建bug分支，在分支上处理bug,合并到主分支，删除bug分支
```git
	git stash    保存工作现场
	git stash list    查看保存的工作现场
    git stash apply   恢复工作现场
    git stash drop    删除stash内容
    git stash pop     恢复的同时删除
```
## 2、常用场景

1、将本地已有项目推送到远程目录

```git
    first: create  a new repository
    second:
        - git remote add origin https://github.com/JohnsonBryant/repositoryname.git
        - git push -u origin master
    //当添加了错误的remote add origin，使用如下命令删除已添加的remote origin
    - git remote rm origin
```