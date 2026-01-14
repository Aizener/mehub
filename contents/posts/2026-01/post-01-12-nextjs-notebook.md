---
title: 全栈框架next.js入手指南
summary: 作为基于react.js的全栈框架next.js在现在不可谓不热门，我个人也上手用了一段时间，体验上面来说还是不错的。所以在这里，给大家分享一下next.js的入手指南！
tags:
  - next.js
  - node.js
---

作为基于`react.js`的全栈框架`next.js`在现在不可谓不热门，我个人也上手用了一段时间，体验上面来说还是不错的。所以在这里，给大家分享一下`next.js`的入手指南！

**如果有理解不到位的地方，还请指正！**

# 基本介绍

该段落简单介绍`next.js`是什么，和`react.js`的关系，以及怎么创建一个`next.js`的项目。

## 认识next.js

这一段落，我们来认识一下什么是`next.js`，为什么要使用它来进行开发。

### 与react.js的关系

首先，我们要了解`next.js`这个框架，就要知道一个点，那就是`next.js`是基于`react.js`之上构建的一个全栈框架，也可以说是`react.js`的框架。

并且，在`react.js`的基础上，`next.js`增加了更多的附加功能和其他优化。

### 为什么要使用next.js

既然`next.js`也是基于`react.js`的，那为啥用`next.js`而不是直接用`react.js`呢？

这是因为`next.js`它本身就有几个`react.js`默认没有的优点：

1.  默认支持`SSR`和`SSG`，有着更好的`SEO`和首屏加载速度；
2.  内置路由系统，搭配模板和页面的使用，可以不用再去配置`react-router`；
3.  内置`API`系统，例如博客这类简单的后端功能甚至直接可以用`next.js`完成；

这是我认为`next.js`相比`react.js`下，体现出来的优点，当然也还有其他的地方。

### SSR和SSG

这是我们经常能听到的两个名词：`SSR`和`SSG`，他们对应的中文翻译叫做：服务端渲染和静态站点渲染。区别就是在于一个是实时渲染，一个是构建时预渲染，具体区别如下：

|    方式    |       SSR        |      SSG       |
| :--------: | :--------------: | :------------: |
|  渲染时机  |    请求的时候    |   构建的时候   |
|  响应速度  |        快        |      很快      |
| 服务器压力 |        中        |       小       |
|  适合场景  | 需展示最新的数据 | 固定显示的内容 |

## 项目初始化

这一段落，我们来说一下如何用`next.js`官方的脚手架创建一个项目并且简单介绍目录结构的功能。

### create-next-app

创建`next.js`的项目，我们需要使用`create-next-app`来进行项目搭建，打开终端，输入以下命令：

```shell
npx create-next-app@latest demo
```

此时，可以看到界面询问我们创建`next.js`需要选择的功能，这个按个人需求来选择，选择完成后最终效果如下图：

![image.webp](/imgs/posts/2026-01/posts-01-12-nextjs-notebook/blog-12-01.webp)

此时，项目已经创建完毕，使用`VSCode`打开该项目。默认情况下，目录结构下的内容并不多，这里我们需要了解的是几个地方：

- public/ 用于存放静态资源的目录
- src/app 用于存放页面的目录（这里是AppRouter，是官方目前推荐的，对应的还有老版本PageRouter，不过不再推荐）
- next.config.ts 这个是`next.js`的框架配置文件，功能很多也很重要
- eslint.config.mjs 这个是`eslint`的配置文件

现在，我们着重关注的应该是`src`目录，之后的许多工作如业务代码编写，都会在该目录下进行。

> 从这一段起，就一直在提到目录，是因为在`next.js`项目中，目录非常重要。
>
> 在`next.js`中，有着默认的约定，例如这里：src/app目录下就对应页面目录，每一个以`page.tsx`命名的文件就是一个页面。
>
> 我们要严格遵循`next.js`的目录约定，否则会有意想不到的问题产生！

# 目录结构

目录结构是`next.js`的一个重点，因为`next.js`的目录命名是约定式的，即不同的目录命名可能对应着不同的功能，若使用错误，则会导致意想不到的问题产生。

在`next.js`的目录中，包括布局、页面、中间件等等功能的命名约定...后面我们说的理论内容，也基本都和每个目录或文件有关。

## public公共目录

对于静态文件，通常在`public`目录下进行存放，例如图片这一类的资源，当需要访问时，直接通过`/`即可。

例如：在`public`目录下有一张图片`logo.png`，访问方式如下：

```tsx
<Image src="/logo.png" alt="logo" width={32} height={32} />
```

## 布局

在`next.js`中，命名为`layout.tsx`的文件就叫布局。他的功能在于，定义公共部分的`UI`，该部分`UI`不会受路由的切换而更新，通常用于导航栏、侧边栏或者底部。

例如下面的布局中，当我们切换路由时，变化的是`main`标签里面的内容，而`header`和`footer`标签内容不会改变。

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header>Header</header>
        <main>
          {/* 当路由切换，这里的内容将进行更新 */}
          {children}
        </main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

另外，除了默认的根布局以外，我们还可以在`app`下每一个页面目录重新创建`layout.tsx`来定义子布局，以此来创建出更多的布局效果。

如果需要创建多个根布局，那就需要用到“组”概念，我们后续来谈。

## 页面

页面是`next.js`的第二个核心功能，每一个页面我们都由`page.tsx`来命名。在`next.js`中，默认已经存在首页，即`src/app/page.tsx`文件。通过访问`/`根路径，我们将看到此页面。

如果想创建新的页面，那就需要新建一个新的目录，并且添加`page.tsx`文件。例如，这里我们在`src/app`目录下面，新建`hello/page.tsx`文件，编写如下代码：

```tsx
function HelloPage() {
  return <div>HelloPage</div>;
}

export default HelloPage;
```

此时，我们就已经成功创建了一个页面，如何访问这个页面呢？还记得前面说的`next.js`重在约定嘛，在`app`目录下面的每一个目录命名，即代表页面路由的命名。

所以这里的`hello`目录名对应的路由即为`/hello`，此时访问`/hello`可以看到如下内容：

![image.webp](/imgs/posts/2026-01/posts-01-12-nextjs-notebook/blog-12-02.webp)

### 动态路由

通过上面的例子可以实现页面和路由创建，那假如此时有这样一个新需求：通过访问`hello/a`或者`hello/b`或者`hello/xxxx`都能匹配到同一个页面，并根据匹配不同的路径来显示不同的内容。

这里就需要使用到`next.js`的动态路由功能了，动态路由以中括号`[...]`来命名，根据上面例子我们则需要更改`hello`目录为`hello/[slug]/page.tsx`。

这里的`[slug]`就表示动态匹配（`slug`不是必须这个格式，但是获取参数需要根据对应名称来获取）。

此时修改`hello/[slug]/page.tsx`代码如下：

```tsx
async function HelloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <div>Hello：{slug}</div>;
}

export default HelloPage;
```

此时再访问`/hello/a`时，将会看到如下内容：

![image.webp](/imgs/posts/2026-01/posts-01-12-nextjs-notebook/blog-12-03.webp)

**如何匹配多层动态路由**

当需要捕获多层动态路由时，例如：`/hello/a/b/c`，此时就需要通过`[...slug]`这种方式命名目录，更改`hello/[slug]/page.tsx`为`hello/[...slug]/page.tsx`，修改为如下代码：

```tsx
async function HelloPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <div>Hello：{slug.join('/')}</div>;
}

export default HelloPage;
```

此时再访问`/hello/a/b/c`将会看到如下页面：

![image.webp](/imgs/posts/2026-01/posts-01-12-nextjs-notebook/blog-12-04.webp)

这里的`params`是固定的写法，与`searchParams`不同，通过`params`来获取的是动态路由上面的参数！

**\[...slug]和\[\[...slug]]**

动态路由的命名方式有两种，一种就是刚刚使用的`[...slug]`，还有一种就是`[[...slug]]`。他们的区别就是在于，是否有匹配的动态参数。

例如当访问`/hello`时，`[...slug]`会出现`404`，而`[[...slug]]`依然呈现页面，只是没有参数。

### 参数获取

除了动态路由的方式能获取参数以外，还可以通过路径后面的`?`追加参数并获取，例如当访问`hello/a?name=cola`时，此时可以通过下面方式获取参数：

```tsx
async function HelloPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { slug } = await params;
  const { name } = await searchParams;
  return (
    <div>
      Hello：{slug.join('/')}，{name}
    </div>
  );
}

export default HelloPage;
```

此时页面将会更新为：

![image.webp](/imgs/posts/2026-01/posts-01-12-nextjs-notebook/blog-12-05.webp)

### 服务端渲染

默认创建的页面都是**服务端渲染**的页面，即不能使用`react.js`的`useState`或者`useEffect`这类依赖浏览器类的`api`，需要定义变量直接在函数里面定义即可，也不需理会生命周期等元素，例如：

```tsx
async function HelloPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { slug } = await params;
  const { name } = await searchParams;
  const animals = ['松鼠', '大象', '老虎'];
  // const [animals] = useState(['松鼠', '大象', '老虎']); 不能使用，会报错

  return (
    <div>
      <p>
        Hello：{slug.join('/')}，{name}
      </p>
      <p>{animals.join(', ')}</p>
    </div>
  );
}

export default HelloPage;
```

### 客户端渲染

倘若我们需要页面进行**客户端渲染**而不是**服务端渲染**，此时则需要再`page.tsx`文件顶部添加`'use client;'`来进行标记，此时`next.js`将对该文件进行**客户端渲染**。

当使用**客户端渲染**时，此时就要用到`react.js`里面的`useState`或者`useEffect`这类钩子函数，而不是像服务端组件那样直接定义变量。

另外，在**客户端组件**中，因为不能使用`async`来定义函数，所以获取参数的方式也有变化，其改变如下代码所示：

```tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { use, useState } from 'react';

function HelloPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = use(params);
  const name = useSearchParams().get('name');
  const [animals] = useState(['松鼠', '大象', '老虎']);

  return (
    <div>
      <p>
        Hello：{slug.join('/')}，{name}
      </p>
      <p>{animals.join(', ')}</p>
    </div>
  );
}

export default HelloPage;
```

动态路由的参数`params`通过`React.use`来获取，而路径参数则通过`useSearchParams`方法获取之后，再通过`get`或者`getAll`获取参数。

**注意事项**

即使是使用了`客户端渲染`的页面，也可能出现`window is not defined`这类问题产生，这可能是由于引入的第三库直接就使用了`window`的原因。而`next.js`的页面呈现，也会在`node`环境下进行，所以导致该类问题产生。

解决方案：考虑在`useEffect`钩子函数里面动态引入。

## 404页面

在`next.js`目录中，我们可以用`not-found.tsx`文件来命名`404`页面，不过情况又分为两种。

### 路径404页面

路径`404`页面是指我们访问不存在的路由时，展示出来的页面。一般来说，当访问不存在的路由时，都会返回`app`目录下的`not-found.tsx`文件。

### 逻辑404页面

逻辑`404`页面是指，在页面中可能遇到不存在的情况时，需要通过代码来跳转到`404`页面。例如：动态路由需要传递`[id]`，但此时获得了不为数字的`id`时，就可以通过执行`notFound`方法来跳转。

逻辑跳转会从当前目录的`not-found.tsx`文件开始查找，直到根目录下的`not-found.tsx`文件。

## 加载页面

加载页面即`loading.tsx`是在数据还在请求或者组件正在挂载时，展示的页面。它也可以放在根目录或者其他页面目录下，其原理就等同于`Suspense`组件。

```vscode
app/
  dashboard/
    page.tsx
    loading.tsx
```

```tsx
// 框架内部伪代码
<Suspense fallback={<DashboardLoading />}>
  <DashboardPage />
</Suspense>
```

## 错误页面

错误页面即`error.tsx`是用于捕获和处理错误的页面。当页面或组件发生错误时，`next.js`会显示错误页面。错误页面必须是客户端组件，需要添加`'use client'`指令。

```tsx
export function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>出错了！</h2>
      <button onClick={() => reset()}>重试</button>
    </div>
  );
}
```

## 组与私有目录

组和私有目录都是在`app`目录下，但不会被`next.js`识别为页面的两种命名形式。

### 组

**组**通过`(...)`来命名，可以用于多级根布局的实现，例如有`模块A`和`模块B`两个模块，需要不同的布局。此时，创建两个目录`(A)`和`(B)`，然后分别在其目录下创建新的`layout.tsx`布局文件。

### 私有目录

**私有目录**通过`_`来命名，可以用于表示存放组件的目录，例如页面`pageA`下需要创建一些只用于该页面的组件时，就可以在`pageA`目录下创建`_components`目录来存放。

## 并行路由和拦截路由

并行路由和拦截路由都是不被`next.js`识别为页面的两种命名方式，拦截路由依托于并行路由来实现效果。

### 并行路由

先来说一下并行路由，并行路由是在页面目录下通过`@xxx/page.tsx`命名的文件，该页面也可以像`children`一样通过`layout.tsx`展示，方式如下：

```tsx
// pageB/@top/page.tsx
function PageBTop() {
  return <div>PageBTop</div>;
}

export default PageBTop;
```

```tsx
// pageB/layout.tsx
import { ReactNode } from 'react';

function LayoutB({ children, top }: { children: ReactNode; top: ReactNode }) {
  return (
    <div className="border border-red-400">
      <div>LayoutB-Header</div>
      <div>{top}</div>
      <div>{children}</div>
      <div>LayoutB-Footer</div>
    </div>
  );
}

export default LayoutB;
```

其展示的页面如下：

![image.webp](/imgs/posts/2026-01/posts-01-12-nextjs-notebook/blog-12-06.webp)

对比写到一个`page.tsx`文件的好处就是，并行路由可以单独的写其他逻辑，例如`loading.tsx`和`not-found.tsx`等文件，甚至也可以在并行路由下创建新的路由。

**注意：创建并行路由没有生效时，删除`.next`文件重新启动。**

### 拦截路由

拦截路由是用于，当点击某个会进行路由跳转的`UI（图片、按钮等）`时，不进行页面跳转，而是在当前页面中进行显示，写法为：

- `(.)`匹配**同一级别的段**
- `(..)`匹配**上一级的段**
- `(..)(..)`匹配**上两级的段**
- `(...)`匹配**根** `app`目录中的段

现在修改`pageB`目录，将`@top/`目录为`@top/(..)pageA/page.tsx`，此时当在`pageB`目录下的进行点击跳转到`/pageA`路由时，将会弹出`@top/(..)pageA/page.tsx`下的文件，如下：

```tsx
// @top/(..)pageA/page.tsx
function PageA() {
  return (
    <div className="fixed top-1/2 left-1/2 aspect-3/2 w-lg -translate-1/2 rounded-md border border-gray-100 bg-white p-3 shadow-md">
      PageA
    </div>
  );
}

export default PageA;
```

**提示**

上面记得要在`@top`目录下创建一个`default.tsx`文件，否则会出现`404`问题，内容如下即可：

```tsx
// @top/default.tsx
function Page() {
  return null;
}

export default Page;
```

```tsx
// pageB/layout.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

function LayoutB({ children, top }: { children: ReactNode; top: ReactNode }) {
  return (
    <div className="border border-red-400">
      <div>LayoutB-Header</div>
      <div>
        {children}
        <Link href="/pageA">拦截路由</Link>
      </div>
      <div>LayoutB-Footer</div>
      {top}
    </div>
  );
}

export default LayoutB;
```

点击**拦截路由**跳转时，页面效果如下：

![image.webp](/imgs/posts/2026-01/posts-01-12-nextjs-notebook/blog-12-07.webp)

**提示**

拦截路由不会影响直接在浏览器中输入路由的操作，意味着输入`/pageA`路由时依然展示为`pageA`页面。

**建议**

如果不是非得使用**拦截路由**和**并行路由**的话，暂时不建议。我在一些论坛上看到挺多人提出问题的，自己在学习这部分时也有问题，有时需要删除`.next`重新启动服务才能解决。

## 中间件

在`next.js`中，中间件一般是用来做路由拦截、响应或者鉴权来使用的。通过在`src`或者根目录下创建文件`middleware.ts`来使用，并且需要默认导出一个函数，如下：

```ts
// src/middleware.ts
export default function middleware() {
  console.log('middleware.');
}
```

当刷新页面后，可以看到终端打印如下，打印了很多`'middleware'`语句：

![image.webp](/imgs/posts/2026-01/posts-01-12-nextjs-notebook/blog-12-08.webp)

这是因为`middleware`处理的不仅仅只是路由请求，还有其他资源请求，修改代码如下，再刷新页面可以看到：

```tsx
// src/middleware.ts
import { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  console.log(req.url + ':middleware.');
}
```

![image.webp](/imgs/posts/2026-01/posts-01-12-nextjs-notebook/blog-12-09.webp)

如果需要对指定路径进行处理的话，就需要使用匹配器，其使用方法如下：

```ts
// src/middleware.ts
import { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  console.log(req.url + ':middleware.');
}

export const config = {
  matcher: ['/pageB'],
};
```

此时只有当请求路径为`/pageB`的路径才会被中间件处理，刷新页面后打印效果如下：

![image.webp](/imgs/posts/2026-01/posts-01-12-nextjs-notebook/blog-12-10.webp)

所以，通过中间件功能我们也可以实现鉴权等功能，例如：

```ts
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = { matcher: ['/dashboard/:path*'] };
```

中间件的功能还是比较丰富的，就不一一赘述了，具体可以看文档：[next.js中间件](https://nextjs.org/docs/app/api-reference/file-conventions/middleware)

## 服务端API

在`next.js`中可以通过在`app`目录下创建`api`目录来作为后端接口，进行响应。

目录名称**api**是固定写法，可以通过`next.config.ts`配置文件进行修改。

在`api`目录下，可以新建新的目录进行`api`接口命名，类似页面那样，例如在`api`目录新建`hello/route.ts`文件，就代表接口为：`/api/hello`。

### route.ts

现在已经知道怎么创建一个`api`了，如何创建对应的响应呢？通过`next.js`提供的写法来实现，如下：

```ts
// src/app/hello/route.ts
import { NextResponse } from 'next/server';

export const GET = () => {
  return NextResponse.json(
    {
      code: 0,
      data: 'this is data',
    },
    { status: 200 }
  );
};
```

上面的`GET`方法就表示为`/api/hello`的`Get`请求处理逻辑，其他请求类型写法也一样。此时，打开浏览器访问`http://localhost:3000/api/hello`，可以看到显示如下：

![image.webp](/imgs/posts/2026-01/posts-01-12-nextjs-notebook/blog-12-11.webp)

# 元数据

在`next.js`中，元数据其实就是通过`js对象`来管理`head`标签的一种方式，其作用包含对`SEO`的优化等，分为两种情况。

## 静态元数据

静态元数据，即固定显示的，无需动态修改。通过导出一个`metadata`对象即可，例如：

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PageC',
  description: 'PageC description.',
};

function PageC() {
  return <div>PageC</div>;
}

export default PageC;
```

上面我们定义了`title`和`description`两个元数据，此时再看页面可以发现：

![image.webp](/imgs/posts/2026-01/posts-01-12-nextjs-notebook/blog-12-12.webp)

## 动态元数据

当元数据需要动态添加时，此时就不能直接用对象的方式定义，而是通过函数`generateMetadata`来实现，如下：

```ts
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  const getMetaData = () => new Promise<{ title: string, description: string }>(resolve => setTimeout(() => {
    resolve({
      title: 'Async PageC',
      description: 'Async PageC description.'
    })
  }, 1e3));

  const { title, description } = await getMetaData();

  return {
    title,
    description
  }
}

function PageC() {
  return (
    <div>
      PageC
    </div>
  );
}

export default PageC;
```

此时在页面上可以看到动态添加的属性，如下图：

![image.webp](/imgs/posts/2026-01/posts-01-12-nextjs-notebook/blog-12-13.webp)

元数据的配置还有很多，具体可以看：[next.js元数据](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

# 图像

在`next.js`中内置了经过优化的`Image`图像组件，使用该组件时需满足以下任意一条：

- 给定明确的`width`和`height`属性；
- 给定`fill`属性；

例如：

```tsx
function PageC() {
  return (
    <div>
      PageC
      <Image src="/cover.jpg" alt="img" width={80} height={120} />
      <div className="relative h-[120px] w-[80px]">
        <Image src="/cover.jpg" alt="img" fill />
      </div>
    </div>
  );
}

export default PageC;
```

倘若使用远程图片的话，则需要在`next.config.ts`中进行配置，否则构建阶段可能出现意想不到的问题，具体配置可以看：[next.js内置图像组件](https://nextjs.org/docs/app/getting-started/images)。

# 缓存

在`next.js`中，请求接口一般采用`fetch`方法，并在`next.js`对于`fetch`方法进行了扩展，增加了缓存的功能，而且缓存不仅与请求，对于页面来说`next.js`也进行了缓存功能的实现。

## fetch缓存

在使用`fetch`时，当我们添加了如下参数，即进行了缓存：

```ts
// 此时在一分钟内的请求都会返回缓存的数据
fetch('https://...', { next: { revalidate: 60 } });
```

如果说不需要缓存功能的话，则用如下方式请求：

```ts
fetch('https://...', { cache: 'no-store' });
```

另外，在扩展的`fetch`请求中还可以通过打上`tag`来强制刷新，例如：

```ts
fetch('https://...', { next: { tags: ['test'] } });
```

当执行`revalidateTag('test')`后，下一次带有`test`标签的请求将会获取最新的数据。

## 页面缓存

在页面中，可以通过定义`revalidate`属性来配置缓存效果，例如：

```tsx
export const revalidate = 60;

function PageC() {
  return <div>PageC</div>;
}

export default PageC;
```

此时，当通过`next build`构建时，将会预渲染这个页面，并且能缓存`60s`的时间，当过了缓存时间后再请求新的页面数据，该配置有3种：

- false 强制为`SSG`模式，不再对页面进行动态渲染；
- 大于0的数字 页面的缓存时间；
- 0 不进行页面缓存，每次请求直接通过`SSR`来渲染页面；

默认来说，在`next.js`中是通过静态生成+`SSR`方式来进行构建的，也就是所谓的`ISR`增量静态再生。

# 样式

对于样式来说，第一个推荐直接使用`css`文件，然后在页面或者组件中直接引入，类似默认`next.js`项目引入`global.css`一样。

第二个就是推荐创建`next.js`时，可选安装的`tailwindcss`工具，这个工具是一个`原子化CSS`的写法，用起来非常方便和简洁。

- [next.js中如何处理样式](https://nextjs.org/docs/app/getting-started/css)
- [tailwindcss](https://tailwindcss.com/)

# ESLint

在创建`next.js`时，也可选用`eslint`工具，此时会在根目录生成`eslint.config.mjs`文件，内容如下：

```js
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
];

export default eslintConfig;
```

如果需要自定义规则的话，可以修改上述代码，例如：

```js
const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    // 自定义插件
    plugins: ['simple-import-sort'],
    // 自定义规则
    rules: {
      semi: ['warn', 'always'],
      quotes: ['error', 'single'],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  }),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'src/components/ui/**',
    ],
  },
];
```

# ShadCN

这里推荐一个工具：`shadcn`，他不是单纯的`UI`库，而是将`radix-ui`、`tailwindcss`、`theme`、`icon`等整合的一个工具平台，安装也很简单，如下：

```shell
npx shadcn@latest init
```

具体细节可以看：[shadcn文档](https://ui.shadcn.com/)

# 结束

以上就是`next.js`的常用基础概念，因为其概念比较多，不能都详细说明，当然这也是优秀强大的框架带来的学习成本。其生态技术远不止这些，感兴趣的话可以通过论坛、视频等再进行学习！
