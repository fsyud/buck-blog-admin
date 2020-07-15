import { Alert, Checkbox, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, connect, Dispatch } from 'umi';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import LoginForm from './components/Login';
import { sessionStorageSet } from '@/utils/tool'

import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;
interface LoginProps {
  dispatch: Dispatch;
  submitting?: boolean;
  userLogin: StateType;
}


const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');
  const [ warn, setWarn ] = useState<string>('');

  useEffect(() => {
    const loginSta = props.userLogin && props.userLogin.successLogin

    if(loginSta && loginSta.data) {
      if(loginSta.data.type && loginSta.data.type + '' !== '0'){
        notification.error({
          message: '非管理员用户不能登陆！！'
        });
        return;
      }
    }
    if(loginSta && loginSta.message){
      setWarn(loginSta.message)
    }
    if(loginSta && loginSta.data) {
      if(Object.keys(loginSta.data)) {
        sessionStorageSet('userInfo', loginSta.data)
      }
    }
  },[props.userLogin])



  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  // 邮箱格式验证
  const emailRules = [
    { required: true, message: '请输入邮箱！' },
    {
      pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
      message: '请输入正确的邮箱格式！',
    },
  ];

  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        {warn ? <LoginMessage content={warn} /> : <div></div>}
        <Tab key="account" tab="账户密码登录">
          <UserName
            name="email"
            placeholder="请输入您的邮箱地址"
            rules={emailRules}
          />
          <Password
            name="password"
            placeholder="请输入正确的密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab="手机号登录">
          <Mobile
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit>登录</Submit>
        <div className={styles.other}>
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default connect(({ login }: { login: ConnectState }) => ({
  userLogin: login,
}))(Login);
