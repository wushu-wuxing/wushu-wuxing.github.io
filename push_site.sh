#!/bin/bash
# 无形识局网站三推脚本：GitHub + Gitee + 本地备份
# 用法: bash push_site.sh "提交说明"
set -e
cd "/d/Hermes One无殊/wushu-wuxing.github.io"

MSG="${1:-网站更新}"

git add -A
git commit -m "$MSG" || echo "(无新提交)"
git push origin main
git push gitee main
git push backup main
echo "✅ 已推送 GitHub + Gitee + 本地备份"
