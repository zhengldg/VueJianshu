<template>
    <div class="container index">
        <a class="top" href="/apps/download?utm_medium=top-download-banner&amp;utm_source=mobile">
            <div class="logo">
                <img src="static/logo.png" alt="New logo">
            </div>
            <div class="slogan">
                <div class="slogan-title">创作你的创作</div>
            </div>
            <a class="app-download" href='http://www.jianshu.com/apps/download?utm_source=mobile&amp;utm_medium=app-download-bottom'>免费下载
                <i class="iconfont ic-link"></i>
            </a>
        </a>
        <img class="img-phone" src="static/img/index_phone-e47b04f8b57ad885770ec579c4341259.png" alt="Index phone">
        <div class="download-guide">
            <ul class="info">
                <li>随时随地发现和创作内容</li>
                <li>每天为你精选好文</li>
                <li>第一时间收到作者文章更新</li>
            </ul>
        </div>

        <div>
            <div class="split-line"></div>
            <div class="top-title">
                <span>热门专题</span>
                <span class="collection-change" @click='refreshRecommend'>
                    <i class="iconfont ic-search-change" style="transform:rotate(0deg);" ref='icSearchChange'></i>换一批
                </span>
            </div>
            <div class="recommend-collection">
                <a v-for="item in recommendList" :href="'http://www.jianshu.com/c/'+ item.slug +'?utm_source=mobile&amp;utm_medium=collections'" class="collection">{{item.title}}</a>
            </div>
        </div>

        <div class="flow-list-container">
            <div class="split-line"></div>
            <div class="top-title">热门文章</div>
            <ul class="flow-list-ul">
                <li class="note-flow" v-for="item in trendingList">
                    <a :href="'http://www.jianshu.com/p/'+item.object.data.slug">
                        <div class="author">
                            <a :href="'http://www.jianshu.com/u/'+ item.object.data.user.slug"><img class="avatar" :src="item.object.data.user.avatar"></a>
                            <a :href="'http://www.jianshu.com/u/'+ item.object.data.user.slug" class="name">
                                {{item.object.data.user.nickname}}
                            </a>
                            <!---->
                        </div>
                        <div class="wrap-img" v-if='item.object.data.list_image_url' :style="{'backgroundImage':'url('+ item.object.data.list_image_url +')'}"></div>
                        <div class="title">{{item.object.data.title}}</div>
                        <p class="abstract">{{item.object.data.public_abbr}}</p>
                        <div class="meta" v-if='item.object.data.important_collection'>
                            <a :href="'http://www.jianshu.com/c/'+item.object.data.important_collection.slug" class="collection-tag">
                                {{item.object.data.important_collection.title}}
                            </a>
                            {{item.object.data.public_comments_count}} 评论 · {{item.object.data.likes_count}} 喜欢 · {{item.object.data.total_rewards_count}} 赞赏
                        </div>
                    </a>
                </li>
            </ul>
            <div>
                <div class="flow-list-placeholder-load-more" @click='gettrendingPage'>
                    展开更多文章
                    <i class="iconfont ic-show"></i>
                </div>
            </div>
        </div>

        <div class="login-footer">
            <div class="split-line"></div>
            <div class="open-app" @click='login'>
                <a>登录</a>
                <!---->
            </div>
            <a href="http://www.jianshu.com/apps/download?utm_source=mobile&amp;utm_medium=app-download-bottom" class="app-download-bottom">
                <i class="iconfont ic-appdownload"></i> 下载简书，创作你的创作
            </a>
        </div>

    </div>
</template>

<script>
import { pageSize } from '../common/config'

export default {
    data() {
        return {
            recommendList: [],
            except_collection_ids: [,],
            icon_search_deg: 0,
            trendingList: [],
            trendingPageIndex: 1
        }
    },
    created() {
    },
    mounted() {
        this.gettrendingPage()
        this.refreshRecommend()
    },
    methods: {
        refreshRecommend() {
            var icon_search_deg = this.icon_search_deg
            this.$refs.icSearchChange.style.transform = `rotate(${icon_search_deg}deg)`;
            this.icon_search_deg += 360;
            var me = this
            var exceptsstr = this.except_collection_ids.join('&except_collection_ids[]=')
            me.$http.get('/mobile/subscriptions/recommended_collections?f=1' + exceptsstr).
                then(x => {
                    me.recommendList = x.data || []
                    x.data.forEach(x => {
                        me.except_collection_ids.push(x.id)
                    })
                })
        },
        gettrendingPage() {
            var me = this;
            var page = this.trendingPageIndex
            var count = pageSize
            me.$http.get(`/mobile/trending/now?page=${page}&count=${count}`)
                .then(x => {
                    me.trendingList = me.trendingList.concat(x.data || [])
                    me.trendingPageIndex++;
                })

        },
        login() {
            this.$router.push('/login')
        }
    }
}
</script>

<style>

</style>
