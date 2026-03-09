import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import Card from './card'
import { useEffect } from 'react'


const Feed = () => {
  const idx = useSelector((store) => store.index);
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const userFeed = async () => {
    try{
      const res = await axios.get(BASE_URL+"/feed", {withCredentials: true});
      dispatch(addFeed(res.data.data));
    }
    catch(err){
      console.error(err?.response?.data);
    }

  }

  useEffect(() => {
    console.log(feed);
    if(!feed || feed.length === 0){
    userFeed();
  }
    else{
      return;
    }
    
  }, [idx])

  if(!feed) return;

  if(feed.length <= 0) return <div className="text-center font-bold">No new user found</div>

  return (
    feed && <div className='flex justify-center my-10'>
      <Card user={feed[0]}/>
    </div>
  )
}

export default Feed
