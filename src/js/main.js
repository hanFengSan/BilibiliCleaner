var blockList = [] //屏蔽列表
var html = document.documentElement.innerHTML //用于检查是否需要刷新

//读取数据
chrome.storage.sync.get('list', function(items) {
    for (let item of items.list) {
        blockList.push(item)
    }
})

// 监听屏蔽列表的变化
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let key in changes) {
        if (key == 'list') {
            blockList = changes[key].newValue
        }
    }
})

const clean = function() {
    console.log('clean')
    blockList.forEach(function(item) {
        // /清潔一般項
        $("[data-up='{0}']".format(item)).remove()
            // 清潔排行榜
        $(".l-item .up-info [title='{0}']".format(item)).parents('li').remove()
            // 清潔動態
        $(".vl-dyn-cnt [up='{0}']".format(item)).parents('li').remove()

        // 清洁评论
        if ($('.comm_list').length != 0) {
            for (let commItem of $('.main-floor')) {
                if (commItem.innerHTML.indexOf(item) != -1)
                    commItem.remove()
            }
        }
    })
}

const DOMModificationHandler = function() {
    $(this).unbind('DOMSubtreeModified')
    setTimeout(function() {
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