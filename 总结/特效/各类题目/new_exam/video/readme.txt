-----����flash������˵��-----Elaine.Zhou
1,ExamMediaPlayer.swf
   �������Ĺ����ǵ���ȫ�ֵ���Ƶ������
   �ڼ���ʱ����Ĭ�ϵ�������volume(0--1);
   ��������ʱ����JS����:changeVolume;

2,MediaPlayer.swf
  ������Ƶ 
   1)����������壺
	defaultSoundUrl����������Զ����Ÿ���Ƶ��Ϊ���򲻲��ţ�һ��Ϊ��Ŀ����ɣ���
        soundUrl: ����Ƶ��ַ��������ź�
	soundId:��Ƶ�ı�ţ������ж����Ƶʱ�����ã�
	volume:ȫ�ֵ�Ĭ������
   2)���ܣ�
      ��1������as����controllPlay(value:int)������Ƶ
            value==1 ��ͣ
            value==2 �ָ�
            value==3 �ز�
      ��2������as ����changeVolume(value:int)������Ƶ ����
      ��3��ÿ�β���ʱ�������Ǵ�ͷ��������ͣ��ʼ������js���� stopOhters(param==�����soundId),ʹ��������Ƶ��ͣ��
       (4) ����as����stopByOther(value:String),�粻�Ǳ�����ȥ����ͣ���󣬼�����ͣ��Ƶ��
       (5)��Ƶ������ɺ� ����js����testSound(value:String)��������Ƶ ���ȣ�00:00,
	(6)Ĭ����Ƶ����󣬵���playOver������
	��7������Ƶ����󣬵���playOverAgain������
       
3��GreeMediaPlayer.swf
   ������Ƶ���򵹼�ʱ
   1)����������壺
        soundUrl: ����Ƶ��ַ��������ɺ󲥷�
	volume:ȫ�ֵ�Ĭ������
	countDown������ʱ��ʱ������ʱ�ĺ�����
        callBackFun:����ʱ��ɺ���õ�js����
    2)���ܣ�
          ��1������as ����replay,���Դ�ͷ����
          ��2����Ƶ������ϣ��������ɺϣ��ص������js����

4��MicphoneTest.swf
   ����ǲ�����������˷�

5��RecorderTOL.swf
   �������¼����
¼���ϴ��ɹ��󣬵���js������flashSaveSuccess,���յ�json���ݷ��ء�