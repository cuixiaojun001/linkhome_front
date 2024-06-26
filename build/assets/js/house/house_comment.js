const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.vueClickOutside = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.vueClickOutside);
        delete el.vueClickOutside;
    },
};

let v = new Vue({
    el: "#app",
    name:'ArticleComment',
    data: {
        btnShow: false,
        index:'0',
        replyComment:'',
        myName:'Lana Del Rey',
        myHeader:'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
        myId:19870621,
        to:'',
        toId:-1,
        comments:[
            {
                name:'Lana Del Rey',
                id:19870621,
                headImg:'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                comment:'我发布一张新专辑Norman Fucking Rockwell,大家快来听啊',
                time:'2019年9月16日 18:43',
                commentNum:2,
                like:15,
                inputShow:false,
                reply:[
                    {
                        from:'Taylor Swift',
                        fromId:19891221,
                        fromHeadImg:'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
                        to:'Lana Del Rey',
                        toId:19870621,
                        comment:'我很喜欢你的新专辑！！',
                        time:'2019年9月16日 18:43',
                        commentNum:1,
                        like:15,
                        inputShow:false
                    },
                    {
                        from:'Ariana Grande',
                        fromId:1123,
                        fromHeadImg:'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
                        to:'Lana Del Rey',
                        toId:19870621,
                        comment:'别忘记宣传我们的合作单曲啊',
                        time:'2019年9月16日 18:43',
                        commentNum:0,
                        like:5,
                        inputShow:false
                    }]
            },
            {
                name:'Taylor Swift',
                id:19891221,
                headImg:'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
                comment:'我发行了我的新专辑Lover',
                time:'2019年9月16日 18:43',
                commentNum:1,
                like:5,
                inputShow:false,
                reply:[
                    {
                        from:'Lana Del Rey',
                        fromId:19870621,
                        fromHeadImg:'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                        to:'Taylor Swift',
                        toId:19891221,
                        comment:'新专辑和speak now 一样棒！',
                        time:'2019年9月16日 18:43',
                        commentNum:25,
                        like:5,
                        inputShow:false
                    }]
            },
            {
                name:'Norman Fucking Rockwell',
                id:20190830,
                headImg:'https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg',
                comment:'Plz buy Norman Fucking Rockwell on everywhere',
                time:'2019年9月16日 18:43',
                commentNum:0,
                like:5,
                inputShow:false,
                reply:[]
            },
        ]
    },
    directives: {clickoutside},
    methods: {
        inputFocus(){
            var replyInput = document.getElementById('replyInput');
            replyInput.style.padding= "8px 8px"
            replyInput.style.border ="2px solid blue"
            replyInput.focus()
        },
        showReplyBtn(){
            this.btnShow = true
        },
        hideReplyBtn(){
            this.btnShow = false
            replyInput.style.padding= "10px"
            replyInput.style.border ="none"
        },
        showReplyInput(i,name,id){
            this.comments[this.index].inputShow = false
            this.index =i
            this.comments[i].inputShow = true
            this.to = name
            this.toId = id
        },
        _inputShow(i){
            return this.comments[i].inputShow
        },
        sendComment(){
            console.log("sendComment")
            if(!this.replyComment){
                this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{
                let a ={}
                let input =  document.getElementById('replyInput')
                let timeNow = new Date().getTime();
                let time= this.dateStr(timeNow);
                a.name= this.myName
                a.comment =this.replyComment
                a.headImg = this.myHeader
                a.time = time
                a.commentNum = 0
                a.like = 0
                this.comments.push(a)
                this.replyComment = ''
                input.innerHTML = '';
                console.log("house_commment; a:" + a)
            }
        },
        sendCommentReply(i,j){
            console.log(sendCommnetReply)
            if(!this.replyComment){
                this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{
                let a ={}
                let timeNow = new Date().getTime();
                let time= this.dateStr(timeNow);
                a.from= this.myName
                a.to = this.to
                a.fromHeadImg = this.myHeader
                a.comment =this.replyComment
                a.time = time
                a.commentNum = 0
                a.like = 0
                this.comments[i].reply.push(a)
                this.replyComment = ''
                document.getElementsByClassName("reply-comment-input")[i].innerHTML = ""
            }
        },
        onDivInput: function(e) {
            this.replyComment = e.target.innerHTML;
        },
        dateStr(date){
            //获取js 时间戳
            var time=new Date().getTime();
            //去掉 js 时间戳后三位，与php 时间戳保持一致
            time=parseInt((time-date)/1000);
            //存储转换值
            var s;
            if(time<60*10){//十分钟内
                return '刚刚';
            }else if((time<60*60)&&(time>=60*10)){
                //超过十分钟少于1小时
                s = Math.floor(time/60);
                return  s+"分钟前";
            }else if((time<60*60*24)&&(time>=60*60)){
                //超过1小时少于24小时
                s = Math.floor(time/60/60);
                return  s+"小时前";
            }else if((time<60*60*24*30)&&(time>=60*60*24)){
                //超过1天少于30天内
                s = Math.floor(time/60/60/24);
                return s+"天前";
            }else{
                //超过30天ddd
                var date= new Date(parseInt(date));
                return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
            }
        }
    }
})