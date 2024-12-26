import { toast } from 'react-hot-toast'
export function successfunction(msg)
{

toast.success(msg)
}
export function promisefunction(myPromise)
{
    toast.promise(myPromise, {
        loading: 'Loading',
        success:'Saved',
        error: 'unSaved',
      });
}
export function errorfunction(msg)
{

toast.error(msg)
}