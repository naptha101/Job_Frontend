
const Resume = ({ imageurl, onclose }) => {
  console.log(imageurl);
  return (
    <div className='flex flex-col pt-12 gap-3 w-full bg-white h-min-screen h-max-fit px-12' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <span className="p-3 bg-red-600 h-10 w-10 text-center   rounded-full hover:cursor-pointer" onClick={onclose}>&times;</span>
      <img alt='Your Resume' src={imageurl}></img>
    </div>
  );
};

export default Resume;
