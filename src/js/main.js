var blockList = [] // 屏蔽列表
var html = document.documentElement.innerHTML // 用于检查是否需要刷新

// 读取数据
chrome.storage.sync.get('list', function (items) {
  for (let item of items.list) {
    blockList.push(item)
  }
})

// 监听屏蔽列表的变化
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let key in changes) {
    if (key == 'list') {
      blockList = changes[key].newValue
    }
  }
})

const clean = function () {
  console.log('clean')
  // 音乐区推荐列表
  let hasRecommand = ($('.top-list').length != 0)
  // 评论列表
  let hasCommList = ($('.comm_list').length != 0)
  
  blockList.forEach(function (item) {
    // /清潔一般項
    $("[data-up='{0}']".format(item)).remove()
    // 清潔排行榜
    $(".l-item .up-info [title='{0}']".format(item)).parents('li').remove()
    // 清潔動態
    $(".vl-dyn-cnt [up='{0}']".format(item)).parents('li').remove()

    // 清洁推荐
    if (hasRecommand) {
      for (let recommandItem of $('.v-item')) {
        if (recommandItem.innerHTML.indexOf(item) != -1) {
          let node = recommandItem.parentNode
          node.parentNode.removeChild(node)
        }
      }
    }

    // 清洁评论
    if (hasCommList) {
      for (let commItem of $('.t')) {
        console.log(commItem.innerHTML)
        if (commItem.innerHTML.indexOf('card="{0}"'.format(item)) != -1) {
          let node = commItem.parentNode
          node.parentNode.removeChild(node)
        }
      }
    }
  })
}

const DOMModificationHandler = function () {
  $(this).unbind('DOMSubtreeModified')
  setTimeout(function () {
    // 判断document是否有变化
    if (html != document.documentElement.innerHTML) {
      clean()
      html = document.documentElement.innerHTML
    }
    $(document).bind('DOMSubtreeModified', DOMModificationHandler)
  }, 250)
}

// Checking page title
if (document.title.indexOf('哔哩哔哩') != -1) {
  clean()
  DOMModificationHandler()
}
