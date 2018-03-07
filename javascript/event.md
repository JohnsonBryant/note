# DOM 事件

事件的手动触发

点击事件：

```javascript
document.querySelector('button').click()

document.querySelector('button').dispatchEvent('click')

IE  使用： .fireEvent('click')
```