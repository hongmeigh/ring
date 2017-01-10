-----关于flash播放器说明-----Elaine.Zhou
1,ExamMediaPlayer.swf
   这个插件的功能是调节全局的音频音量。
   在加载时传入默认的音量：volume(0--1);
   调节音量时调用JS函数:changeVolume;

2,MediaPlayer.swf
  播放音频 
   1)传入参数定义：
	defaultSoundUrl：加载完成自动播放该音频，为空则不播放（一般为题目的题干）；
        soundUrl: 主音频地址，点击播放后
	soundId:音频的编号（用于有多个音频时区别用）
	volume:全局的默认音量
   2)功能：
      （1）调用as函数controllPlay(value:int)控制音频
            value==1 暂停
            value==2 恢复
            value==3 重播
      （2）调用as 函数changeVolume(value:int)调节音频 音量
      （3）每次播放时（无论是从头，还是暂停后开始）调用js函数 stopOhters(param==本身的soundId),使其它的音频暂停。
       (4) 调用as函数stopByOther(value:String),如不是本身发出去的暂停请求，即可暂停音频。
       (5)音频加载完成后， 调用js函数testSound(value:String)，返回音频 长度：00:00,
	(6)默认音频播完后，调用playOver函数。
	（7）主音频播完后，调用playOverAgain函数。
       
3，GreeMediaPlayer.swf
   播放音频，或倒计时
   1)传入参数定义：
        soundUrl: 主音频地址，加载完成后播放
	volume:全局的默认音量
	countDown：作计时器时，倒计时的毫秒数
        callBackFun:倒计时完成后调用的js函数
    2)功能：
          （1）调用as 函数replay,可以从头播放
          （2）音频播放完毕，或计器完成合，回调传入的js函数

4，MicphoneTest.swf
   这个是测试音量和麦克风

5，RecorderTOL.swf
   这个用来录音。
录音上传成功后，调用js函数，flashSaveSuccess,把收到json数据返回。