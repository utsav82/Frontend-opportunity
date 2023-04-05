import { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import { Typewriter, cursor } from 'react-simple-typewriter'

import Featuerd from '../components/Featuerd';
const LandingPage = ({ frontend_intern, backend_intern, full_stack, loading }) => {
  const [category, setcategory] = useState('')
  const [search,setSearch]=useState('By Skills')
  const [searching,setSearching]=useState(false)
  const [data,setdata]=useState([])
  const onOptionChangeHandler = (event) => {
    setSearch(event.target.value)
}


  async function fetchsearch(){
    
    try{

      if(search==='By Skills'){
        const res=await fetch(`https://opportunity.run-ap-south1.goorm.site/jobs?skills=${category}`)
        const data=await res.json()
        setSearching(true)
        setdata(data)
        console.log(data)
      }
      else{
        const res=await fetch(`https://opportunity.run-ap-south1.goorm.site/jobs?tags=${category}`)
        const data=await res.json()
        setSearching(true)
        setdata(data)
        console.log(data)
      }
    }
    catch(err){
      console.log(err.message)
  }
  
  }
  useEffect(()=>{
    if(category===''){
      setSearching(false)
    }
  },[category])


  return (
    <div>
      <div className=''>
        <h1 className='font-semibold lg:text-[40px] text-[25px] md:text-[35px] text-center md:pt-[50px] pt-[25px] font-serif mx-3'>Explore Your Dream <span className='text-indigo-600'><Typewriter words={['Internships']} loop={100000} cursor cursorStyle='|' typeSpeed={190} /></span> Here</h1>
        <div className=' flex flex-row justify-center md:mt-[20px] mt-[15px] mx-[10px] '>
          <BiSearch onClick={fetchsearch} className='md:text-[44px] text-[25px] h-[30px] text-[#110a60] bg-slate-200 md:h-[50px]  mb-[9px] rounded-l-[30px] pl-[11px] cursor-pointer' />
          <div className='relative '>
            <select onChange={onOptionChangeHandler} 
            className='absolute max-md:w-[80px] md:right-3 right-2 hover:text-gray-200 bg-[#110a60] text-white md:px-[14px] px-[3px] md:py-1 py-0 rounded-2xl md:top-[10px] top-[5px] md:text-base text-sm cursor-pointer'>
              <option>By Skills</option>
              <option>By Category</option>
            </select>
            <input name='search-type' placeholder='Press enter to search' value={category} onKeyUp={(e)=>{if(e.key==='Enter'){fetchsearch()}}} className='md:h-[50px] h-[30px] md:w-[620px]  w-[260px] md:text-2xl text-base font-semibold  bg-slate-200 rounded-r-[30px] md:px-5 px-2' onChange={(e) => { setcategory(e.target.value) }} /></div>
        </div>

        <h1 className='text-center poppins-font font-semibold lg:text-[40px] text-indigo-600 text-[23px] md:text-[30px] py-4 mx-[15px]'>Top Internships Available Now</h1>
      </div>
{(searching)?<div className='lg:mx-[45px] mx-[22px] mt-4'>
  <Featuerd catogery='Top Results' internship={data}/>
</div>:<div className='lg:mx-[45px] mx-[22px] mt-4'>
        <Featuerd catogery='Full-stack' internship={full_stack.filter((intern) => {
          return intern.exclusive
        })} loading={loading} />
        <Featuerd catogery='Frontend' internship={frontend_intern.filter((intern) => {
          return intern.exclusive
        })} loading={loading} />
        <Featuerd catogery='Backend' internship={backend_intern.filter((intern) => {
          return intern.exclusive
        })} loading={loading} />

      </div>}
      
    </div>
  )
}

export default LandingPage
