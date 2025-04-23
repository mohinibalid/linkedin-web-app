import React from 'react';
import './Jobs.css';
import JobsTopOption from './JobsTopOption';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import JobsBottomTopOption from './JobsBottomTopOption';
import JobsBottomLastOption from './JobsBottomLastOption';

const Jobs = () => {
    return (
    <div className='jobs'>
        <div className='jobs__top'>
            <JobsTopOption Icon={BookmarkIcon} title='My Jobs'/>
            <JobsTopOption Icon={NotificationsIcon} title='Jobs Alert'/>
            <JobsTopOption Icon={CreditCardIcon} title='Salary'/>
            <JobsTopOption Icon={AssignmentTurnedInIcon} title='Skill Assessments'/>
            <div className='jobsTopRight__option'>
                <h1 style={{fontSize:14,fontWeight:400,color:'gray',marginLeft:5,cursor:'pointer'}}>More</h1>
            <ArrowDropDownIcon style={{cursor:'pointer',color:'gray'}}/>
            </div>
            
            <button>Post a free job</button>
                
        </div>
        <div className='jobs__middle'>
        <h1 style={{alignSelf:'center',fontSize:19,fontWeight:300,marginTop:30}}>Search for your next job</h1>
            <div className='jobsMiddle__option'>
                <input placeholder='Search by title,skill or company'/>
                <input placeholder='City,state or zip code'/>
                <button>Search</button>
            </div>
        </div>
        <div className='jobs__bottom'>
            <div className='jobsBottom__top'>
                <h1 style={{fontSize:16,fontWeight:500}}>Jobs Searches</h1>
                <div className='jobsBottomTop__option'>
                    <JobsBottomTopOption developer='React Js' location='India'/>
                    <JobsBottomTopOption developer='Flutter developer' location='Noida, India'/>
                    <JobsBottomTopOption developer='React native' location='Pune, India'/>
                </div>
            </div>
            
            <div className='jobsBottom__last'>
                <h1 style={{fontSize:15,fontWeight:500}}>Recommended for you</h1>
                <h1 style={{fontSize:14,fontWeight:300}}>Based on your profile and search history</h1>
                <div className='jobsBottomLast__option'>
                    <JobsBottomLastOption
                        image='https://media-exp1.licdn.com/dms/image/C4D0BAQGYECbt8La6hQ/company-logo_200_200/0/1615221424934?e=1625097600&v=beta&t=tpg0d6fcsQf2Yl95CyH2PChga15kpnR5_j7MOKesElk'
                        location='Pune, India'
                        profession='React Js Developer'
                    />
                    <JobsBottomLastOption
                        image='https://media-exp1.licdn.com/dms/image/C4D0BAQGYECbt8La6hQ/company-logo_200_200/0/1615221424934?e=1625097600&v=beta&t=tpg0d6fcsQf2Yl95CyH2PChga15kpnR5_j7MOKesElk'
                        location='Noida, India'
                        profession='Java Developer | Full Stack Developer'
                    />
                    <JobsBottomLastOption
                        image='https://media-exp1.licdn.com/dms/image/C4D0BAQGYECbt8La6hQ/company-logo_200_200/0/1615221424934?e=1625097600&v=beta&t=tpg0d6fcsQf2Yl95CyH2PChga15kpnR5_j7MOKesElk'
                        location='Bangalore, India'
                        profession='Node Js Developer | Full Stack Developer'
                    />
                    <JobsBottomLastOption
                        image='https://media-exp1.licdn.com/dms/image/C4D0BAQGYECbt8La6hQ/company-logo_200_200/0/1615221424934?e=1625097600&v=beta&t=tpg0d6fcsQf2Yl95CyH2PChga15kpnR5_j7MOKesElk'
                        location='Noida, India'
                        profession='Java Developer | Full Stack Developer'
                    />
                    <JobsBottomLastOption
                        image='https://media-exp1.licdn.com/dms/image/C4D0BAQGYECbt8La6hQ/company-logo_200_200/0/1615221424934?e=1625097600&v=beta&t=tpg0d6fcsQf2Yl95CyH2PChga15kpnR5_j7MOKesElk'
                        location='Bangalore, India'
                        profession='Node Js Developer | Full Stack Developer'
                    />
                </div>
            </div>
        </div>
    </div>
    );
};

export default Jobs;