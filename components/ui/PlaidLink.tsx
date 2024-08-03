import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './button'
import { useRouter } from 'next/navigation';
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link'
import { createLinkToken } from '../../lib/actions/user.actions';

const PlaidLink = ({user,variant}: PlaidLinkProps) => {
    const [token, setToken] = useState('')
    const router = useRouter();

    useEffect(() => {
        const getLinkToken = async()=> {
            const data = await createLinkToken(user)
        }
        getLinkToken()
    }, [user])
    const onSuccess = useCallback<PlaidLinkOnSuccess>(async(public_token: string)=> {
       // await exhangePublicToken({
       // publicToken: public_token,
      //  user, 
       // })
       router.push('/')
    }, [user])
    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }
    const { open, ready } = usePlaidLink(config)
  return (
    <>
    { variant === 'primary' ? (
        <Button onClick ={() => open()} disabled={!ready} variant='ghost' className='plaidlink-primary'>
            Connect Bank
        </Button> ) : variant === 'ghost' ? (
        <Button>
            Connect Bank
        </Button>
        ): (
            <Button onClick={() => open()} className="plaidlink-default">
              <Image src="/icons/connect-bank.svg" alt="connect bank" width={24} height={24} />
              <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
            </Button>
          )}
    </>
)}

export default PlaidLink