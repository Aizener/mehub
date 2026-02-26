# Git Commit 规范

# 目标

- 基于当前分支的修改生成 git commit message 的修改内容

# 约束

- 使用中文描述非专业术语
- commit message 按常规格式，多行改动用列表显示
- 避免过度的查看 git 历史提交记录
- 输出生成的内容，不用修改代码

# 输出示例

**示例 1**

```
feat(demo): 生成 demo 功能

- 完成了 demo1 方案
- 完成了 demo2 方案
- 修复了之前的某问题
```

**示例 2**

```
fix(bug1): 生成 demo 功能

- 修复了 xx 某问题
- 修复了 yy 某问题
```

**示例 3**

```
chore(xx.md): 修改了 xx 文档

- 修改了 xx 的说明
```
