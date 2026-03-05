import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import Card from './card'
import { useEffect } from 'react'


const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const userFeed = async () => {
    try{
      const res = await axios.get(BASE_URL+"/feed", {withCredentials: true});
      dispatch(addFeed(res.data.data));
    }
    catch(err){
      console.log(err?.response?.data);
    }

  }
  useEffect(() => {
    if(feed) return;
    userFeed();
  })
  return (
    feed && <div className='flex justify-center my-10'>
      <Card user={feed[0]}/>
    </div>
  )
}

export default Feed
