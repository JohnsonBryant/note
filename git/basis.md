# git 基础

> 简介：配置并初始化一个仓库（repository）、开始或停止跟踪（track）文件、暂存（stage）、提交（commit）更改。忽略指定文件和文件模式、撤销操作、浏览历史版本及不同提交间的差异、向远程仓库推送及从远程仓库拉取文件。

## 1、获取git 仓库

有两种取得git仓库的方法。一是将本地项目，init 为git仓库，通过在现有项目下导入所有文件到git；二是从远程服务器克隆（clone）一个现有的git仓库

### 初始化本地项目

```git
git init
//命令行工具下执行这个命令，初始化一个本地项目的git仓库

git add *.c
git add LICENSE
//通过git add 命令实现对指定文件的跟踪

git commit -m 'init project version'
// git commit -m 命令进行提交到本地仓库
```

该命令将创建一个.git 的子目录，这个目录包含有初始化的git 仓库中所有的必须文件。

### 克隆现有仓库

使用场景：获得一份已经存在的git 仓库的拷贝。比如，为某个开源项目贡献。

Git 克隆的是该 Git 仓库服务器上的几乎所有数据，而不是仅仅复制完成你的工作所需要文件。 执行 git clone 命令时，默认配置下远程 Git 仓库中的每一个文件的每一个版本都将被拉取下来。可以使用任何一个克隆下来的用户端来重建服务器上的仓库

```git
//克隆仓库的命令格式如下
git clone [url]

//示例，克隆git 的可链接仓库libgit2,会在执行命令的当前目录下新建一个名为lib2 的目录，并在目录下初始化一个 .git 文件夹，远程拉取的所有数据会存放在 .git 文件夹。
git clone https://github.com/libgit2/libgit2

//克隆远程仓库，并重命名本地仓库为 mylibgit
git clone https://github.com/libgit2/libgit2 mylibgit
```

## 2、 git 基础 - 记录每次更新档仓库

### 文件状态

工作目录下所有的文件必定为两种状态的一种：已跟踪或未跟踪

- 已跟踪：已被纳入版本控制的文件，文件之后状态可能处于未修改、已修改或已放入暂存区
- 未跟踪：除了已跟踪之外的其他文件都属于未跟踪文件，既不处于快照记录中，也没放在暂存区。

文件状态：untracked  unmodified  modified  staged

### 检查当前仓库文件状态

命令：git status ，用于查看文件处于什么状态

状态简览命令： git status -s  或  git status --short ,输出简洁版的文件状态信息

### 跟踪新文件，暂存已修改文件

命令 command：开始跟踪指定文件，或将已跟踪文件当前状态暂存，使文件处于暂存状态。

```git
git add <filename>
```

注意：git add 命令使用文件或目录的路径作为参数；如果参数是目录的路径，该命令将递归地跟踪该目录下的所有文件；运行了 git add 之后又作了修改的文件，需要重新运行 **git add** 把最新版本重新暂存起来。

### 忽略文件 .gitignore

> 创建 .gitignore 文件，列出要忽略的文件模式。

#### .gitignore 文件格式规范

    - 所有空行或者以 # 开头的行会被 git 忽略
    - 可以使用标准的 glob 模式匹配
    - 匹配模式可以使用 / 开头防止文件递归
    - 匹配模式可以以 / 结尾指定目录
    - 忽略指定模式意外的文件或目录，在模式钱加惊叹号 ！ 取反

glob 模式：指shell 所使用的简化了的正则表达式。 （*）匹配零或多个任意字符；[abc] 匹配任何一个列在方括号中的字符； ？ 只匹配一个任意字符；[0-9] 表示两个字符范围内的都可以匹配，匹配所有0到9的数字；使用2个星号（**）表示匹配任意中间目录，比如 `a/**/z`，可以匹配a/z, a/b/z 或 a/b/c/z等。

示例：

```git
# no .a files
*.a     //忽略所有以 .a结尾的文件

#but do track lib.a, even though you're ignoring .a files above
!lib.a

# only ignore the TODO file in the current directory, not subdir/TODO
/TODO

# ignore all files in the build/directory
build/

# ignore doc/notes.txt, but not doc/server/arch.txt
doc/*.txt

# ignore all .pdf files in the doc/ directory
doc/**/*.pdf
```

### 查看已暂存和未暂存的修改 git diff

相关命令 command：

```git
//查看当前文件与暂存区快照之间的差异
git diff
//查看已暂存的将要添加到下次提交里的内容
git diff --cached
git diff --staged
```

查看尚未暂存的文件更新了哪些部分，不加参数直接输入 git diff ：此命令比较的是工作目录中当前文件和暂存区域快照之间的差异，也就是修改之后还没有暂存起来的变化内容。

git diff 本身只显示尚未暂存的改动，而不是自上次提交以来所做的左右改动。

### 提交更新 git commit

注意：提交前，一定确认所有修改或新建的文件都已暂存到暂存区域，已执行过 git add 命令，否则提交时，不会记录未暂存的变化。这些修改过的文件只保留在本地磁盘。所以，每次提交前，先执行 git status 查看当前仓库状态，然后运行提交命令 git commit

命令 command：

```git
git commit
  会启动文本编辑器（vim），用来输入提交说明
git commit -v
  进入文本编辑器，并显示详细修改内容提示，将改变的diff 输出放在编辑器界面，退出编辑器时，git 会丢掉注释行，用输入提交附带信息生成一次提交
git commit -m 'commit message'
  将提交信息与命令行放在同一行，提交信息必须
git commit -a -m 'commit message'
  跳过使用暂存区域，执行命令，会将所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤
```

### 移除、移动文件

命令 command：

```git
git rm <fileName>
  删除文件，并清除文件跟踪状态，git rm 命令后面可以列出文件或者目录名
git rm -f <fileName>
  删除前修改过并且已放到暂存区域的话，需要用 -f 参数。
git rm --cached <fileName>
  上方命令：只把文件从git 仓库中移除（从暂存区移除），但仍保留在当前工作目录中，使用 --cached 参数。

git mv file_from file_to
  移动、重命名文件。 注意：只能对已跟踪（执行过git add）文件执行git mv 命令
  相当于运行下面三条命令
mv file_from file_to
git rm file_from
git add file_to
```

## 3、git 查看提交历史

命令： git log

参数：

```git
-p    按补丁格式显示每个更新之间的差异
--stat    显示简洁的每次更新的文件修改信息
--shortstat    只显示--stat中最后的行数修改添加移除统计
--name-only    仅在提交信息后显示已修改的文件清单
--name-status    显示新增、修改、删除的文件清单
--abbrev-commit    仅显示SHA-1的前几个字符，而非所有的40个字符
--relative-date    使用较短的相对时间显示（比如，"2 weeks ago"）
--graph    显示ASCII图形表示的分支合并历史
--pretty    使用其他格式显示历史提交信息。可用选项包括 oneline、short、full、fuller和format（后跟指定格式）
```

format [常用选项](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2#pretty_format)

## 4、git 撤销操作

- 命令：git commit --amend

  这个命令会将暂存区中的文件提交。如果自上次提交之后未做任何修改，那么快照会保持不变，所做修改只是提交信息。

提交后发现忘记暂存某些需要的修改，可执行如下操作,最终只会有一个提交，第二次提交将代替第一次提交的结果。

```command
git commit -m 'initial commit'
git add forgotten_file
git commit --amend
```

- 取消暂存的文件

```git
git reset HEAD <fileName>
```

注意：git 中只有被提交的文件可以被恢复。被删除的分支中的提交或使用amend 选项覆盖的提交也可以恢复。未提交的部分，无法恢复。

## 5、git 远程仓库的使用--基础

> 简介：托管在因特网或其他网络中的项目的版本库。远程仓库管理：添加远程仓库、移除、管理不同的分支并定义他们是否被跟踪等等。

### git remote 命令

```git
git remote
  查看已配置的远程仓库服务器信息。
git remote -v
  显示需要读写远程仓库使用的git 保存的简写及其对应的URL。

git remote add <shortname> <url>
  添加远程仓库，并制定一个可引用的简写。执行命令之后，可使用字符串 shortname 代替整个 URL。

git fetch <remote-name>
  从远程仓库获取数据。访问远程仓库，拉取所有你还没有的数据，执行完之后，将拥有远程仓库的所有分支的引用，可随时合并或查看。 注意：git fetch 会拉取数据到本地仓库，但不会自动合并或修改当前的工作，需要手动合并。
git pull
  运行 git pull 通常会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的分支。或你的分支设置为跟踪一个远程分支时，使用 git pull 拉取更简单。

git push
git push  [remote-name] [branch-name]
git push origin master
  推送到远程分支。只有当具有写入权限，且之前没有人推送过时，才能生效。多人项目，应该先执行 git pull 并合并到你的工作后，才能推送。

git remote show [remote-name]
  查看远程分支的更多信息：远程仓库的URL、跟踪分支信息等

git remote rename shortname_from shortname_to
  重命名引用的名字，修改一个远程仓库的简写名，同事也会修改远程分支的名字。

git remote rm [remote-name]
  移除指定远程仓库： git remote rm pb
```

## 6、git 基础 - 标签

## 7、git 基础 - 别名

命令 command：

```git
git config --global alias.co checkout

git config --global alias.br branch

git config --global alias.ci commit

git config --global alias.st status

git config --global alias.unstage 'reset HEAD -'

git config --global alias.last 'log -1 HEAD'
```