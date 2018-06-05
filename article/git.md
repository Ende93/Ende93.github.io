## update the fork project use command line
> without the pull request which difficult use.
1. [set upstream `git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git`](https://help.github.com/articles/configuring-a-remote-for-a-fork/)
2. fetch upstream `git fetch upstream`
3. checkout your target branch `git checkout master`
4. merge the upstream branch to your branch `git merge upstream/master`
5. push the merge

use `git remote -v` to check the upstream branchs.[see more](https://help.github.com/articles/syncing-a-fork/).