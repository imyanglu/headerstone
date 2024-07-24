'use client';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import TextInput from '../components/TextInput';
import { deleteCookie, getId, setCookie } from '../lib';
import { getVerifyCode, verifyCodeById } from '../api';

const Login = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState({
    loadingVerifyCode: false,
    login: false,
  });
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [verifyCode, setVerifyCode] = useState<string>('');

  const verifyEmail = (email: string) => {
    const EmailAddressRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EmailAddressRegex.test(email);
  };

  const checkVerify = () => {
    const isReg = verifyEmail(value);
    if (isReg && error) {
      return setError('');
    }
    if (!isReg) setError('邮箱地址格式错误');
  };

  const addToast = (data: { type: string; message: string; title: string }) => {};
  const getCode = async () => {
    try {
      if (!verifyEmail(value)) {
        setError('邮箱地址格式错误');
        return;
      }
      const id = getId();
      setIsLoading((a) => ({ ...a, loadingVerifyCode: true }));
      await getVerifyCode(value, id);
      addToast({ type: 'success', message: '验证码已发送', title: '' });
    } catch (err) {
      addToast({ type: 'error', message: '发生错误', title: '' });
    } finally {
      setIsLoading((a) => ({ ...a, loadingVerifyCode: false }));
    }
  };

  const login = async () => {
    const id = getId();
    verifyCodeById({ code: verifyCode, id }).then((data) => {
      const me = data.user;
      if (!me) {
        return;
      }

      if (!me.isSetup) {
        const me = { email: value, isSetup: false, id: '', nickname: '', avatar: '', bio: '' };
        deleteCookie('user');
        setTimeout(() => {
          alert('该用户未注册!');

          return;
        }, 0);
      }
      setCookie('user', me, 14);
      router.push('/');
    });
  };

  useEffect(() => {
    deleteCookie('user');
  }, []);

  return (
    <div className="w-[100vw] bg-white h-[100vh] fixed top-0 bottom-0 left-0 right-0 z-[3]">
      <div className="flex flex-row w-[450px] mx-auto pt-[100px]">
        <div className="flex-1  pl-[16px] pr-[40px]">
          <p className="text-[#000] font-bold text-[30px]">登录</p>
          <p className="text-[14px] font-normal text-[#000] mb-[24px] leading-[21px]  mt-[16px]">
            验证码可能在垃圾邮箱哦。
          </p>

          <TextInput
            label="邮箱地址"
            value={value}
            onBlur={checkVerify}
            onChangeText={(str) => {
              if (error) setError('');
              setValue(str);
            }}
          />
          <div className="h-[20px] my-[4px]">
            {!!error && (
              <div className="h-[20px]  leading-[16px] text-[12px] text-[#f00] ">{error}</div>
            )}
          </div>
          <div className="flex flex-row justify-between">
            <input
              className="h-[50px] border-[1px] rounded-[8px] outline-none text-center"
              type="number"
              onChange={(e) => {
                setVerifyCode(e.target.value);
              }}
            />
            <div
              onClick={isLoading.loadingVerifyCode ? () => {} : getCode}
              className="bg-[#29C758]  w-[120px] h-[50px] cursor-pointer text-[#fff] text-[12px] rounded-[15px]  flex justify-center items-center">
              {isLoading.loadingVerifyCode ? 'loading...' : '   获取验证码'}
            </div>
          </div>
          <div
            className="cursor-pointer text-[20px] text-[#5FCEFC] shadow-sm mt-[30px] h-[50px] rounded-[8px] font-bold leading-[50px] text-center mx-auto border-[#5FCEFC] border-[1px]"
            onClick={isLoading.login ? () => {} : login}>
            {isLoading.login ? '登录中...' : '登录'}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
