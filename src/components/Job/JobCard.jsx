import { motion } from 'framer-motion';
import { CiLocationOn } from 'react-icons/ci';
import { FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobCard = ({ job, by, i, navigate, userImg }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      key={i}
      onClick={() => navigate('/job/' + job._id)}
      className="flex flex-col gap-4 w-full shadow-lg shadow-gray-600 cursor-pointer rounded-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">{job.title}</p>
        {by[i] && by[i].profileSet && (
          <div className="w-16 h-16 border-2 border-gray-800 rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src={by[i].profileSet ? by[i].profile.url : userImg} alt={by[i].username} />
          </div>
        )}
      </div>

      {by[i] && (
        <Link to={`/userprofile/${by[i]._id}`} className="text-blue-500 hover:underline">
          {by[i].username}
        </Link>
      )}

      <div className="bg-[#3652AD] p-2 rounded-md w-fit text-white text-sm">{job.category}</div>
      <h2 className="text-gray-700">{job.description}</h2>
      <p className="text-gray-500 flex items-center gap-1">
        <CiLocationOn /> {`${job.country}, ${job.city}, ${job.location}`}
      </p>
      <p className="text-xs text-right flex items-center gap-2 justify-end text-gray-400">
        <FaRegEye /> {job.count ? job.count : "0"}
      </p>
    </motion.div>
  );
};

export default JobCard;
