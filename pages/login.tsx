import { signInAnonymously } from 'firebase/auth';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

interface Inputs {
  email: string;
  password: string;
}

const login = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (login) {
      await signIn(data.email, data.password);
    } else {
      await signUp(data.email, data.password);
    }
  };

  return (
    <div className='relative w-full flex h-screen flex-col bg-black items-center justify-center bg-transparent'>
      <Head>
        <title>Login - Moovie</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Image
        src={require('../assets/bg_login.jpg')}
        alt=''
        fill
        className='-z-10 opacity-60 !inline'
        objectFit='cover'
      />

      <a href='/'>
        <Image
          src={require('../assets/logo.png')}
          alt=''
          width={100}
          height={100}
          className='absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6'
        />
      </a>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md: max-w-md md:px-4'
      >
        <h1 className='text-4xl font-semibold'>Вхід</h1>
        <div className='space-y-4'>
          <label htmlFor='' className='inline-block w-full'>
            <input
              {...register('email', { required: true })}
              type='email'
              placeholder='Email'
              className='input'
            />
            {errors.email && (
              <span className='text-[#e50914] text-[13px]'>
                Будь ласка, введіть корректний email
              </span>
            )}
          </label>
          <label htmlFor='' className='inline-block w-full'>
            <input
              {...register('password', { required: true })}
              type='password'
              placeholder='Пароль'
              className='input'
            />
            {errors.password && (
              <span className='text-[#e50914] text-[13px]'>
                Це поле є обов'язковим
              </span>
            )}
          </label>
        </div>

        <button
          className='w-full rounded bg-[#e50914] py-3 font-semibold'
          onClick={() => setLogin(true)}
        >
          Вхід
        </button>

        <div className='text-[gray]'>
          Ще не зареєстровані?{' '}
          <button
            className='text-white hover:underline'
            type='submit'
            onClick={() => setLogin(false)}
          >
            Реєстрація
          </button>
        </div>
      </form>
    </div>
  );
};

export default login;
