---
title: 如何在next.js中处理表单提交
summary: 在前端的开发中，与后端交互必然是绕不开的话题，其中表单的处理则是占比很大的一部分，这篇文章就来探讨一下如何在next.js中处理表单提交。
date: 2026/01/15 22:42
tags:
  - next.js
  - node.js
---

在前端的开发中，与后端交互必然是绕不开的话题，其中表单的处理则是占比很大的一部分，这篇文章就来探讨一下如何在`next.js`中处理表单提交。

# 准备

在探讨开始，我们需要通过`next.js`脚手架来创建一个空项目，打开终端输入：

```shell
npx create-next-app@latest form-demo
```

至于创建时的选项，按照个人习惯即可。对表单进行处理时，我们应该分为两个情况来进行。

第一种：简单表单的处理，对于简单的表单，我们可自行进行判断即可完成；  
第二种：较复杂表单的处理，对于这类表单，一般来说依赖第三方库来处理更佳，也是重点部分。

# 简单表单

简单的表单处理十分简单...额，好像是废话￣□￣｜｜...先看下方这种登录表单：

![image.png](/imgs/posts/2026-01/01-15-nextjs-form/1.webp)

这种表单很简单，就两个`input`输入框，这种处理也十分简单：

1.  我们可以在`input`的`blur`或者`change`事件后进行判断，然后在下方进行错误提示的回显处理；
2.  在提交按钮的处理时间中进行判断，然后进行回显或者`toast`处理。

例如，下面通过提交事件进行`toast`来提醒用户，如下所示：

```tsx
'use client';
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast('请输入用户名或者密码！');
      return;
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="border border-gray-200 rounded-md shadow-md p-8">
        <h1 className="font-bold text-xl text-center">登录</h1>
        <form
          className="flex flex-col gap-y-4 justify-center items-center mt-6"
          onSubmit={onSubmit}
        >
          <div className="flex items-center gap-x-2">
            <p className="w-20 text-right">用户名：</p>
            <input
              className="w-64 border border-gray-500 rounded-sm px-2 py-1 text-sm"
              placeholder="请输入用户名"
              value={username}
              onChange={e => setUsername(e.currentTarget.value)}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <p className="w-20 text-right">密码：</p>
            <input
              className="w-64 border border-gray-500 rounded-sm px-2 py-1 text-sm"
              placeholder="请输入密码"
              type="password"
              value={password}
              onChange={e => setPassword(e.currentTarget.value)}
            />
          </div>
          <div className="w-full border-t pt-4 mt-4 border-gray-200 text-right">
            <button
              type="submit"
              className="bg-black/90 text-white px-6 py-2 rounded-md text-sm cursor-pointer hover:shadow-md shadow-black/50"
            >登录</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
```

![image.png](/imgs/posts/2026-01/01-15-nextjs-form/2.webp)

这种简单表单的处理方式很简单，也很灵活。没有太多讨论的必要，下面我们来讨论一下较为复杂的表单处理。

# 复杂表单

我们先来看一下复杂的表单，如下图所示：

![image.png](/imgs/posts/2026-01/01-15-nextjs-form/3.webp)

像这种表单，包含了基本的`input`输入框，也包含了选择框和开关、日期、文件上传等`form`组件，甚至像友情链接这种字段，还会加入动态的`json`数组。

对于这类表单，如果还自己去判断的话，尽管灵活可自定义，但是却有很冗余的代码，以及维护起来没那么容易。所以，对于这类表单，最好借助第三方库。

## react-hook-form

`react-hook-form`是基于`react`的一款表单验证处理方案，所以同样也适用于`next.js`框架，通过如下命令进行依赖安装：

```shell
npm i react-hook-form
```

如何使用该库呢？如下代码所示：

```tsx
import { useForm } from "react-hook-form";

export default function Home() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm();
    return (...);
}
```

通过`useForm`钩子函数，我们可以解构获得如下：`register`、`watch`、`handleSubmit`三个方法，以及一个`errors`对象，当然`useForm`不止这些参数。

对于以上解构出来的参数，其意义分别如下：

*   register 注册对应的`form`表单值，表单值、验证、状态都由`react-hook-form`来管理；
*   watch 监听对应表单值的变化；
*   handleSubmit 包装表单的提交函数；
*   errors 表单的错误信息（验证不通过的信息将在该对象里）

## register/errors/handleSubmit

现在，我们来尝试使用，修改代码如下：

```tsx
'use client';

import { SubmitHandler, useForm } from "react-hook-form";

type FormType = {
  title: string;
  description: string;
}
export default function Home() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log('form data:', data);
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="border border-gray-200 rounded-md shadow-md p-8">
        <h1 className="font-bold text-xl text-center">网站设置</h1>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-4xl grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-x-2">
                <p className="w-20 text-right">网站标题：</p>
                <input
                  className="w-64 border border-gray-500 rounded-sm px-2 py-1 text-sm"
                  placeholder="请输入标题"
                  {...register('title', { required: '请输入网站标题' })}
                />
              </div>
              <p className="text-red-600 font-bold text-sm ml-24 mt-1">{errors.title?.message}</p>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <p className="w-20 text-right">网站描述：</p>
                <input
                  className="w-64 border border-gray-500 rounded-sm px-2 py-1 text-sm"
                  placeholder="请输入网站描述"
                  {...register('description', { required: '请输入网站描述' })}
                />
              </div>
              <p className="text-red-600 font-bold text-sm ml-24 mt-1">{errors.description?.message}</p>
            </div>
            ...
```

从上面代码我们可以看到，通过以下4步即可管理表单验证：

1.  定义字段的类型；
2.  在`useForm`中通过`defaultValues`定义默认值；
3.  在`form`表单的`input`中`register`注册对应的表单值（这里不再需要使用`state`进行状态管理了，而是由`react-hook-form`进行管理）
4.  注册`onSubmit`事件，通过`handleSubmit`包装，当提交表单事件时，对校验表单。

现在再看页面，当修改不合法的值或者提交表单时，会回显出提示信息，如图：

![image.png](/imgs/posts/2026-01/01-15-nextjs-form/4.webp)
## watch

上面我们从`useForm`获取的`watch`方法还未用到，这里举个例子：当我们需要先填了`网站标题`才能填写`网站描述`时（未填标题时，禁用处理），怎么实现呢？就需要通过`watch`来实现，修改代码如下：

```tsx
  ...
  const subscribeTitle = watch('title');

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log('form data:', data);
  }

  return (
    ...
             <div className="flex items-center gap-x-2">
                <p className="w-20 text-right">网站描述：</p>
                <input
                  className={clsx(
                    'w-64 border border-gray-500 rounded-sm px-2 py-1 text-sm',
                    subscribeTitle.trim().length === 0 ? 'bg-gray-300' : ''
                  )}
                  placeholder={subscribeTitle.trim().length === 0 ? '请先填写网站标题' : '请输入网站描述'}
                  disabled={subscribeTitle.trim().length === 0}
                  {...register('description', { required: '请输入网站描述' })}
                />
              </div>
              <p className="text-red-600 font-bold text-sm ml-24 mt-1">{errors.description?.message}</p>
            </div>
  ...
```

通过`watch`监听`title`的变化，从而对`description`网站描述进行动态显示，效果图如下：

![image.png](/imgs/posts/2026-01/01-15-nextjs-form/5.webp)

## zod

目前，通过`react-hook-form`已经可以进行简单的表单验证和一些动态处理了，但是类型判断和提示信息目前是通过`register`里面进行的不是很方便。

所以`react-hook-form`提供了与其他验证库进行搭配使用的方法，这里使用`zod`验证库进行搭配使用。

打开终端，安装`zod`依赖：

```shell
npm i @hookform/resolvers zod
```

修改之前的代码，如下所示：

```tsx
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';
import { format } from 'date-fns';

const schema = z.object({
  title: z.string().min(1, { message: '请输入网站标题' }),
  description: z.string().min(1, { message: '请输入网站描述' })
});

type FormType = z.infer<typeof schema>;

export default function Home() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const subscribeTitle = watch('title');

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log('form data:', data);
  }
...
```

上面的代码中，重点在于这两段代码：

```tsx
const schema = z.object({
  title: z.string().min(1, { message: '请输入网站标题' }),
  description: z.string().min(1, { message: '请输入网站描述' })
});

type FormType = z.infer<typeof schema>;
```

通过定义`schema`来定义表单的验证规则，通过`z.infer`来获取表单类型。经过上述的代码修改后，页面也按照之前一样正常运行。

现在有了`zod`协助，就可以写出更复杂的限制条件了。

## Controller

目前我们通过`register`方法可以很轻松让`react-hook-form`给我们管理状态并且验证值的合法性，但是一旦值不是`string`这类简单的情况时，就不行了。例如：

这是当前定义的`zod`验证规则：

```ts
enum Theme {
  DARK = 'dark',
  LIGHT = 'light'
}

const schema = z.object({
  title: z.string().min(1, { message: '请输入网站标题' }),
  description: z.string().min(1, { message: '请输入网站描述' }),
  keywords: z.string().min(1, { message: '请输入关键词' }),
  id: z.string().min(1, { message: '请输入网站ID' }),
  email: z.string().email({ message: '请输入网站邮箱' }),
  isMaintenance: z.boolean(),
  createdAt: z.coerce.date(),
  theme: z.nativeEnum(Theme, { message: '请选择主题' }),
  logo: z.instanceof(File, { message: '请上传图片LOGO' }),
  links: z.array(z.object({
    name: z.string().min(1, { message: '请输入链接名' }),
    url: z.string().url({ message: '请输入有效的URL' })
  })).optional()
});
```

然后给对应的每个表单组件进行`register`注册，但页面结果如下：

![image.png](/imgs/posts/2026-01/01-15-nextjs-form/6.webp)

对于常用的表单组件来说，使用`register`完全可以，因为他们的值都是`string`类型，并且可以通过`onChange`这类事件来修改值。  
但是对于`date`和`input[file]`这类组件就不行了，因为：

1.  我们这里需要的`date`类型为`z.date`，但是这里的表单组件返回的是`2025/09/22`字符串，解决办法可以把`z.date`改为`z.string`类型；
2.  对于`input[file]`表单组件，他的返回值为`FileList`类型，对于这里的`z.file`也不匹配；

所以上面日期组件和图片上传组件都验证不通过，因此我们需要使用`react-hook-form`提供的`Controller`组件来更灵活的自定义验证规则，代码修改如下：

```tsx
import { Controller } from "react-hook-form";
...
const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors }
} = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      keywords: '',
      id: '',
      email: '',
      isMaintenance: undefined,
      createdAt: undefined,
      theme: undefined,
    }
});
...
<div>
  <div className="flex items-center gap-x-2">
    <p className="w-20 text-right">创建日期：</p>
    <Controller
      name="createdAt"
      control={control}
      render={({ field }) => (
        <input
          type="date"
          className="w-64 border border-gray-500 rounded-sm px-2 py-1 text-sm"
          value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
          onChange={e => field.onChange(new Date(e.target.value))}
        />
      )}
    />
  </div>
  <p className="text-red-600 font-bold text-sm ml-24 mt-1">{errors.createdAt?.message}</p>
</div>
<div>
  <div className="flex items-center gap-x-2">
    <p className="w-20 text-right">网站logo：</p>
    <Controller
      name="logo"
      control={control}
      render={({ field }) => (
        <input
          type="file"
          accept="image/*"
          className="border border-gray-500 rounded-sm p-1 text-sm"
          onChange={e => field.onChange(e.target.files?.[0])}
        />
      )}
    />
  </div>
  <p className="text-red-600 font-bold text-sm ml-24 mt-1">{errors.logo?.message}</p>
</div>
...
```

再次测试，结果如下图：

![image.png](/imgs/posts/2026-01/01-15-nextjs-form/7.webp)

可以看到，现在表单验证就可以通过了，这就是`Controller`组件的作用，通过`name`,`control`,`render`三个属性就可以更加灵活的进行表单验证。

## 嵌套

在一些特别的情况下，我们的表单组件可能会有其他表单组件，此时就需要通过嵌套`Controller`的方式来进行表单验证了，例如下图的友情链接：

![image.png](/imgs/posts/2026-01/01-15-nextjs-form/8.webp)

上面的友情链接可以增加也可以移除项，每项里面也有`input`输入框需要验证，此时就需要嵌套`Controller`进行校验，代码修改如下：

```tsx
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";

const {
    control,
    handleSubmit,
    formState: { errors }
} = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      links: []
    }
});

const { fields: links, append, remove } = useFieldArray({
    control,
    name: 'links'
});

const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log('form data:', data);
}
...
<div>
  <div className="flex items-baseline gap-x-2">
    <p className="w-20 text-right">友情链接：</p>
    <div className="flex flex-col gap-y-2">
      {
        links.map((item, idx) => (
          <div key={item.id} className="flex items-baseline gap-x-2">
            <Controller
              name={`links.${idx}.name`}
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    type="text"
                    className="w-24 border border-gray-500 rounded-sm p-1 text-sm"
                    placeholder="请输入链接名"
                    {...field}
                  />
                  <p className="text-red-600 font-bold text-sm mt-1">{fieldState.error?.message}</p>
                </div>
              )}
            />
            <Controller
              name={`links.${idx}.url`}
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    type="text"
                    className="w-48 border border-gray-500 rounded-sm p-1 text-sm"
                    placeholder="请输入链接URL"
                    {...field}
                  />
                  <p className="text-red-600 font-bold text-sm mt-1">{fieldState.error?.message}</p>
                </div>
              )}
            />
            <span
              className="border rounded-full flex justify-center items-center text-[12px] w-5 h-5 text-red-600 border-red-600 cursor-pointer"
              onClick={() => remove(idx)}
            >－</span>
          </div>
        ))
      }
      <button
        type="button"
        className="border px-2 py-1 text-sm rounded-sm cursor-pointer hover:bg-gray-200"
        onClick={() => append({ name: '', url: '' })}
      >添加</button>
    </div>
  </div>
  <p className="text-red-600 font-bold text-sm ml-24 mt-1">{errors.links?.message}</p>
</div>
...
```

完成后的效果图如下：

![image.png](/imgs/posts/2026-01/01-15-nextjs-form/9.webp)

最终提交表单，可以看到`onSubmit`方法中打印的值，如下图：

![image.png](/imgs/posts/2026-01/01-15-nextjs-form/10.webp)

**补充说明**

可以看到，上面的错误提示是在每一项后面新增的，因为需要`fieldState`提供错误信息。如果需要在外层统一处理的话，可以使用`createPortal`进行渲染。

## 赋值

当操作表单为编辑时，此时需要初始化表单值，在`react-hook-form`中也很简单，通过引用`useForm`的`reset`方法，然后进行表单值的重置即可，例如：

```tsx
import { useEffect } from "react";
...
const {
    control,
    reset,
    register,
    watch,
    handleSubmit,
    formState: { errors }
} = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      keywords: '',
      id: '',
      email: '',
      isMaintenance: undefined,
      createdAt: undefined,
      theme: undefined,
      links: []
    }
});
useEffect(() => {
    const initData = async () => {
      const imgUrl = 'https://zod.dev/_next/image?url=%2Flogo%2Flogo-glow.png&w=256&q=100';
      const res = await fetch(imgUrl);
      const blob = await res.blob();
      const file = new File([blob], 'file', { type: blob.type });
      // 模拟异步请求
      const data = await new Promise<FormType>(resolve => setTimeout(() => resolve({
        title: '标题',
        description: '描述',
        keywords: '关键词',
        id: '1',
        email: 'test@email.com',
        isMaintenance: true,
        createdAt: new Date(),
        theme: Theme.DARK,
        logo: file,
        links: [
          { name: 'test', url: 'http://test.com' },
          { name: 'test2', url: 'http://test@email2.com' },
        ]
      }), 2e3))
      reset(data);
    }

    initData();
}, [reset]);
...
```

完成后打开页面，效果如下图：

![image.png](/imgs/posts/2026-01/01-15-nextjs-form/11.webp)

可以注意到上面文件没有被赋值，这是因为浏览器的原因。而且上面`logo`上传的设计是有问题的，这里是因为作为例子才这样使用，实际上应该是上传图片后，通过`url`来给`img`标签进行预览的。

# 结语

到这里，对于`react-hook-form`的基本使用就差不多了，感兴趣的话可以去[react-hook-form](https://react-hook-form.com/)看更多的特性和相关内容。
